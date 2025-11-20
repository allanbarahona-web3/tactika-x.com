# 🏢 Multi-Tenant Domain Routing - SaaS Real Implementation

**Status**: ⏳ NOT IMPLEMENTED (NEEDED FOR PRODUCTION SaaS)

---

## 🎯 Problema Actual vs SaaS Real

### ¿Cómo se identifica el tenant actualmente?
Actualmente, el tenant se identifica por **JWT payload** (el usuario envía su tenantId):

```typescript
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // El usuario proporciona tenantId en el login
  return this.authService.login(loginDto);
}

// En JWT: { sub: "user-id", tenantId: 1, ... }
```

### ¿Cómo debería funcionar en SaaS Real?

En un SaaS real (como Shopify, Stripe, etc.):
- **Tienda 1**: `store1.miapp.com` → Tenant 1
- **Tienda 2**: `store2.miapp.com` → Tenant 2
- **Tienda 3**: `mystore.com` → Tenant 3

El tenant se identifica **automáticamente por el dominio**, no por un parámetro del usuario.

---

## 📊 Arquitectura Requerida

```
┌─────────────────────────────────────────────────────────────┐
│                    Cliente Browser                          │
│                  store1.miapp.com                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    Extrae Host: store1.miapp.com
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              HostExtractionMiddleware                        │
│  ├─ Lee Host header del request                            │
│  ├─ Busca en BD: TenantDomain.domain = 'store1.miapp.com'  │
│  ├─ Obtiene tenantId = 1                                    │
│  └─ Agrega a request: req.tenantId = 1                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   JWT AuthGuard                             │
│  ├─ Valida token JWT                                        │
│  ├─ Extrae tenantId del token                              │
│  └─ VERIFICA: token.tenantId === req.tenantId              │
│      (Previene cross-tenant access)                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Tenant Context                            │
│  └─ SET app.tenant_id = req.tenantId (para RLS)            │
└─────────────────────────────────────────────────────────────┘
                              ↓
                         ✅ Accepted
```

---

## 1. 🗄️ Agregar Tabla `TenantDomain` al Schema

```prisma
// Agregar a prisma/schema.prisma

model TenantDomain {
  id            Int       @id @default(autoincrement())
  tenantId      Int
  tenant        Tenant    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  // El dominio o subdominio (ej: store1.miapp.com, mystore.com)
  domain        String    @unique
  
  // Si es el dominio primario
  isPrimary     Boolean   @default(true)
  
  // Verificación de propiedad (para custom domains)
  verificationToken String?
  verifiedAt    DateTime?
  
  // Control
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@unique([tenantId, domain])
  @@index([domain])
  @@index([tenantId])
  @@map("tenant_domains")
}

// Agregar a modelo Tenant:
model Tenant {
  // ... campos existentes ...
  
  // Relación con dominios
  domains TenantDomain[]
  
  // ... resto del modelo ...
}
```

---

## 2. 📝 Migration SQL

```bash
npx prisma migrate dev --name add_tenant_domains
```

O crear migration manual:

```sql
CREATE TABLE tenant_domains (
  id SERIAL PRIMARY KEY,
  "tenantId" INT NOT NULL,
  domain VARCHAR(255) NOT NULL UNIQUE,
  "isPrimary" BOOLEAN NOT NULL DEFAULT true,
  "verificationToken" VARCHAR(255),
  "verifiedAt" TIMESTAMP,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_tenant_domains_tenant FOREIGN KEY ("tenantId") 
    REFERENCES tenants(id) ON DELETE CASCADE,
  
  CONSTRAINT uk_tenant_domain UNIQUE ("tenantId", domain),
  INDEX idx_domain (domain),
  INDEX idx_tenant_id ("tenantId")
);

-- Enable RLS for tenant_domains
ALTER TABLE tenant_domains ENABLE ROW LEVEL SECURITY;

-- Policy: Solo ver tus propios dominios
CREATE POLICY "Users see own tenant domains" ON tenant_domains
  FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id')::int);

-- Policy: Solo crear en tu tenant
CREATE POLICY "Users create domains in own tenant" ON tenant_domains
  FOR INSERT
  WITH CHECK ("tenantId" = current_setting('app.tenant_id')::int);

-- Policy: Solo actualizar tus dominios
CREATE POLICY "Users update own tenant domains" ON tenant_domains
  FOR UPDATE
  USING ("tenantId" = current_setting('app.tenant_id')::int)
  WITH CHECK ("tenantId" = current_setting('app.tenant_id')::int);

-- Policy: Solo eliminar tus dominios
CREATE POLICY "Users delete own tenant domains" ON tenant_domains
  FOR DELETE
  USING ("tenantId" = current_setting('app.tenant_id')::int);
```

---

## 3. 🔧 Crear HostExtractionMiddleware

```typescript
// src/common/middleware/host-extraction.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HostExtractionMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Obtener el host del header
      const host = req.get('host');
      
      if (!host) {
        // Sin host, no podemos determinar el tenant
        // Continuar (JWT lo validará después)
        return next();
      }

      // Buscar el dominio en la BD (cache recomendado en prod)
      const tenantDomain = await this.prisma.tenantDomain.findUnique({
        where: { domain: host },
        select: {
          tenantId: true,
          isActive: true,
        },
      });

      if (!tenantDomain || !tenantDomain.isActive) {
        // Dominio no existe o está inactivo
        // Continuar sin req.tenantIdFromHost (será validado por JWT)
        return next();
      }

      // Guardar el tenantId extraído del dominio
      req.tenantIdFromHost = tenantDomain.tenantId;

      next();
    } catch (error) {
      console.error('Error extracting tenant from host:', error);
      // Continuar sin fallar - JWT lo validará
      next();
    }
  }
}

// Agregar tipo a Express Request
declare global {
  namespace Express {
    interface Request {
      tenantIdFromHost?: number;
    }
  }
}
```

---

## 4. 🛡️ Mejorar JwtAuthGuard para Validar Dominio

```typescript
// src/modules/auth/guards/jwt-auth.guard.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenService } from '../../../common/services/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    // 1. Validar JWT signature + expiry
    const isValid = (await super.canActivate(context)) as boolean;
    if (!isValid) {
      return false;
    }

    // 2. Validar JTI (revocación)
    const user = request.user as any;
    const isTokenRevoked = await this.tokenService.isTokenRevoked(
      user.userId,
      user.jti,
    );
    if (isTokenRevoked) {
      throw new UnauthorizedException('Token has been revoked');
    }

    // 3. ✨ NUEVO: Validar que el token pertenece al dominio actual
    const tokenTenantId = user.tenantId;
    const hostTenantId = request.tenantIdFromHost;

    // Si el middleware extrajo un tenantId del dominio
    if (hostTenantId && tokenTenantId !== hostTenantId) {
      throw new UnauthorizedException(
        'Token does not match the requested domain',
      );
    }

    return true;
  }
}
```

---

## 5. 📋 Registrar Middleware en AppModule

```typescript
// src/app.module.ts

import { HostExtractionMiddleware } from './common/middleware/host-extraction.middleware';
import { TenantContextMiddleware } from './common/middleware/tenant-context.middleware';

@Module({
  // ... imports ...
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // 1️⃣ Primero: Extraer tenantId del dominio
      .apply(HostExtractionMiddleware)
      .forRoutes('*')
      
      // 2️⃣ Segundo: Establecer contexto de tenant para RLS
      .apply(TenantContextMiddleware)
      .forRoutes('*');
  }
}
```

---

## 6. 📚 Crear Service para TenantDomains

```typescript
// src/modules/tenant-domains/tenant-domains.service.ts

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTenantDomainDto } from './dto/create-tenant-domain.dto';

@Injectable()
export class TenantDomainsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: number, dto: CreateTenantDomainDto) {
    // Verificar si el dominio ya existe en otro tenant
    const existing = await this.prisma.tenantDomain.findUnique({
      where: { domain: dto.domain },
    });

    if (existing) {
      throw new ConflictException('Domain already in use');
    }

    return this.prisma.tenantDomain.create({
      data: {
        tenantId,
        domain: dto.domain.toLowerCase(),
        isPrimary: dto.isPrimary ?? false,
      },
    });
  }

  async findAllByTenant(tenantId: number) {
    return this.prisma.tenantDomain.findMany({
      where: { tenantId },
      orderBy: { isPrimary: 'desc' },
    });
  }

  async findPrimaryDomain(tenantId: number) {
    return this.prisma.tenantDomain.findFirst({
      where: {
        tenantId,
        isPrimary: true,
        isActive: true,
      },
    });
  }

  async setAsPrimary(tenantId: number, domainId: number) {
    // Desactivar primary actual
    await this.prisma.tenantDomain.updateMany({
      where: { tenantId, isPrimary: true },
      data: { isPrimary: false },
    });

    // Establecer nuevo primary
    return this.prisma.tenantDomain.update({
      where: { id: domainId },
      data: { isPrimary: true },
    });
  }

  async removeDomain(tenantId: number, domainId: number) {
    // Verificar que no es el último dominio
    const count = await this.prisma.tenantDomain.count({
      where: { tenantId, isActive: true },
    });

    if (count <= 1) {
      throw new ConflictException('Cannot remove the last domain');
    }

    return this.prisma.tenantDomain.delete({
      where: { id: domainId },
    });
  }

  async verifyCustomDomain(tenantId: number, domainId: number) {
    // En producción:
    // 1. Generar verification token
    // 2. Enviar email al usuario
    // 3. Usuario agrega DNS record con el token
    // 4. Este endpoint verifica el DNS record
    
    const domain = await this.prisma.tenantDomain.findFirst({
      where: { id: domainId, tenantId },
    });

    if (!domain) {
      throw new NotFoundException('Domain not found');
    }

    // Aquí iría la verificación DNS real
    // Por ahora, solo marcamos como verificado
    return this.prisma.tenantDomain.update({
      where: { id: domainId },
      data: { verifiedAt: new Date() },
    });
  }
}
```

---

## 7. 🎮 Controller para TenantDomains

```typescript
// src/modules/tenant-domains/tenant-domains.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantDomainsService } from './tenant-domains.service';
import { CreateTenantDomainDto } from './dto/create-tenant-domain.dto';

@Controller('tenant-domains')
@UseGuards(JwtAuthGuard)
@SkipThrottle()
export class TenantDomainsController {
  constructor(private readonly tenantDomainsService: TenantDomainsService) {}

  @Post()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async create(
    @Request() req,
    @Body() dto: CreateTenantDomainDto,
  ) {
    return this.tenantDomainsService.create(req.user.tenantId, dto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.tenantDomainsService.findAllByTenant(req.user.tenantId);
  }

  @Get('primary')
  async getPrimaryDomain(@Request() req) {
    return this.tenantDomainsService.findPrimaryDomain(req.user.tenantId);
  }

  @Patch(':id/set-primary')
  async setAsPrimary(@Request() req, @Param('id') domainId: string) {
    return this.tenantDomainsService.setAsPrimary(
      req.user.tenantId,
      parseInt(domainId, 10),
    );
  }

  @Patch(':id/verify')
  async verifyDomain(@Request() req, @Param('id') domainId: string) {
    return this.tenantDomainsService.verifyCustomDomain(
      req.user.tenantId,
      parseInt(domainId, 10),
    );
  }

  @Delete(':id')
  async removeDomain(@Request() req, @Param('id') domainId: string) {
    return this.tenantDomainsService.removeDomain(
      req.user.tenantId,
      parseInt(domainId, 10),
    );
  }
}
```

---

## 8. 📦 DTO para TenantDomains

```typescript
// src/modules/tenant-domains/dto/create-tenant-domain.dto.ts

import { IsString, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class CreateTenantDomainDto {
  @IsString()
  @IsUrl()
  domain: string; // ej: store1.miapp.com o mystore.com

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
```

---

## 9. 🔄 Flujo de Login Mejorado

### Antes (Actual):
```
POST /auth/login
{
  "email": "admin@store.com",
  "password": "password123"
}

JWT incluye: { tenantId: 1, ... }
```

### Después (Con Dominios):
```
Request a: store1.miapp.com/api/v1/auth/login
{
  "email": "admin@store.com",
  "password": "password123"
  // NO es necesario enviar tenantId
}

✨ Middleware extrae tenantId del dominio
✨ JWT se emite con ese tenantId
✨ Guard verifica que token matches el dominio
```

---

## 10. 🧪 Ejemplos de Uso

### Crear un tenant con dominio

```bash
# 1. Crear tenant
POST /api/v1/tenants
{
  "name": "Mi Tienda",
  "slug": "mi-tienda",
  "industry": "retail"
}
# Response: { id: 1, ... }

# 2. Registrar usuario owner
POST /api/v1/tenant-users
{
  "email": "admin@example.com",
  "password": "SecurePass123",
  "name": "Admin User",
  "role": "owner"
}

# 3. Agregar dominio
POST store.miapp.com/api/v1/tenant-domains
Authorization: Bearer <JWT>
{
  "domain": "store.miapp.com",
  "isPrimary": true
}

# 4. Login automático
POST store.miapp.com/api/v1/auth/login
{
  "email": "admin@example.com",
  "password": "SecurePass123"
}
# Middleware extrae tenant del dominio automáticamente
```

### Custom domain

```bash
# Agregar custom domain
POST store.miapp.com/api/v1/tenant-domains
{
  "domain": "mystore.com",
  "isPrimary": false
}

# Recibe verification token
# Usuario agrega DNS record
# Verifica:
PATCH store.miapp.com/api/v1/tenant-domains/2/verify

# Ahora ambos dominios funcionan
POST store.miapp.com/api/v1/...    # ✅ Works
POST mystore.com/api/v1/...       # ✅ Works
```

---

## 11. 🔒 Seguridad Mejorada

### Validaciones en cadena:
1. ✅ **Host Extraction**: Dominio existe en BD
2. ✅ **JWT Validation**: Token es válido
3. ✅ **Tenant Match**: token.tenantId === request.tenantIdFromHost
4. ✅ **JTI Revocation**: Token no ha sido revocado
5. ✅ **RLS**: Base de datos filtra por tenant automáticamente

### Caso de ataque evitado:
```
Attacker intenta:
POST mystore.com/api/v1/products
Authorization: Bearer <JWT_token_from_store1.com>

Guard rechaza:
❌ Token claims tenantId=1, pero dominio es tenantId=2
❌ UnauthorizedException: "Token does not match the requested domain"
```

---

## 12. 🗂️ Estructura de Módulo

```
src/modules/tenant-domains/
├── tenant-domains.controller.ts
├── tenant-domains.service.ts
├── tenant-domains.module.ts
└── dto/
    └── create-tenant-domain.dto.ts
```

---

## 13. 📊 Checklist de Implementación

- [ ] Agregar modelo `TenantDomain` al schema
- [ ] Crear migration `add_tenant_domains`
- [ ] Ejecutar migration en base de datos
- [ ] Crear `HostExtractionMiddleware`
- [ ] Crear `TenantDomainsService`
- [ ] Crear `TenantDomainsController`
- [ ] Crear DTOs
- [ ] Mejorar `JwtAuthGuard` con validación de dominio
- [ ] Registrar middleware en `AppModule`
- [ ] Crear `TenantDomainsModule`
- [ ] Agregar RLS policies para `tenant_domains`
- [ ] Implementar caché para dominios (Redis)
- [ ] Testing de cross-tenant access attempts
- [ ] Documentación de APIs

---

## 14. 🚀 Implementación Recomendada

### Fase 1 (Base):
1. Schema + Migration
2. HostExtractionMiddleware
3. JwtAuthGuard mejorado
4. Service + Controller básico

### Fase 2 (Producción):
1. Caché Redis para dominios (reducir queries)
2. Verificación de custom domains (DNS)
3. Bulk domain operations
4. Domain analytics/logging

### Fase 3 (Enterprise):
1. SSL certificates por dominio
2. Domain-specific branding
3. Domain-specific rate limiting
4. Regional domain routing

---

## 15. ⚙️ Configuración ENV Recomendada

```env
# Host Extraction
HOST_EXTRACTION_ENABLED=true
PRIMARY_DOMAIN_SUFFIX=miapp.com

# Custom Domains
CUSTOM_DOMAINS_ENABLED=true
DNS_VERIFICATION_TOKEN_EXPIRY=86400  # 24 horas

# Cache
TENANT_DOMAIN_CACHE_TTL=3600  # 1 hora
```

---

**Status**: READY TO IMPLEMENT  
**Complexity**: Medium  
**Impact**: CRITICAL for production SaaS  
**Estimated Time**: 4-6 hours

Este es un componente **ESENCIAL** para un SaaS real. Sin esto, el sistema es solo multi-tenant a nivel de código, pero no a nivel de usuario (los usuarios aún necesitan saber su tenantId).
