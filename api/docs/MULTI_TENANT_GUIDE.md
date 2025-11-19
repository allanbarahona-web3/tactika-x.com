# Multi-tenant + JWT/JTI - Guía de Uso

Esta guía documenta la infraestructura multi-tenant implementada con JWT, JTI y preparación para RLS.

## 🔐 Autenticación JWT con JTI

### Payload del JWT
Cada token incluye:
- `sub`: User ID
- `tenantId`: ID del tenant (string)
- `role`: Rol del usuario (owner/manager/staff)
- `jti`: JWT ID único para revocación

### Ejemplo de Login
```typescript
POST /api/v1/auth/login
{
  "email": "admin@tienda.com",
  "password": "password123",
  "tenantId": "1"
}

Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "admin@tienda.com",
    "name": "Admin",
    "role": "owner",
    "tenantId": "1"
  }
}
```

## 🎯 Decoradores en Controllers

### @CurrentUser()
Obtiene el objeto user completo del request:

```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@CurrentUser() user: any) {
  // user = { userId, email, tenantId, role, jti }
  return user;
}
```

### @CurrentTenant() o @TenantId()
Obtiene solo el tenantId:

```typescript
@Get('products')
@UseGuards(JwtAuthGuard)
async getProducts(@CurrentTenant() tenantId: string) {
  return this.productsService.findAllByTenant(tenantId);
}
```

### Uso combinado
```typescript
@Post('products')
@UseGuards(JwtAuthGuard)
async createProduct(
  @CurrentTenant() tenantId: string,
  @CurrentUser() user: any,
  @Body() dto: CreateProductDto
) {
  console.log('Creating product for tenant:', tenantId);
  console.log('By user:', user.email);
  return this.productsService.create(tenantId, dto);
}
```

## 🛡️ Guards

### JwtAuthGuard
Protege endpoints que requieren autenticación:

```typescript
@Controller('products')
@UseGuards(JwtAuthGuard) // Protege todo el controller
export class ProductsController {
  @Get() // Requiere autenticación
  findAll(@CurrentTenant() tenantId: string) {
    return this.productsService.findAllByTenant(tenantId);
  }
}
```

### RolesGuard
Protege por roles (ya implementado en common/guards):

```typescript
import { Roles } from '@/common/decorators';
import { RolesGuard } from '@/common/guards';

@Post('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('owner', 'manager')
async createUser(@Body() dto: CreateTenantUserDto) {
  // Solo owner o manager pueden ejecutar esto
}
```

## 🔑 Revocación de Tokens (JTI)

### TokenService
Servicio global para manejar revocación:

```typescript
// Inyectar en cualquier servicio
constructor(private tokenService: TokenService) {}

// Verificar si un token está revocado
const isRevoked = this.tokenService.isTokenRevoked(jti);

// Revocar un token específico
this.tokenService.revokeToken(jti);

// Revocar todos los tokens de un usuario
this.tokenService.revokeAllUserTokens(userId);

// Revocar todos los tokens de un tenant (suspender tenant)
this.tokenService.revokeAllTenantTokens(tenantId);

// Obtener stats
const stats = this.tokenService.getStats();
// { activeTokens: 150, revokedTokens: 23, totalTokens: 173 }
```

### Endpoints de revocación ya implementados

```typescript
// Logout (revoca el token actual)
POST /api/v1/auth/logout
Headers: Authorization: Bearer <token>
Body: { "refreshToken": "..." }

// Revocar todas las sesiones del usuario
POST /api/v1/auth/revoke-all
Headers: Authorization: Bearer <token>
```

## 📊 Patrón Multi-tenant en Services

Todos los services deben recibir `tenantId` como primer parámetro:

```typescript
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // ✅ CORRECTO: Siempre filtrar por tenantId
  async findAllByTenant(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
    });
  }

  async create(tenantId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        tenantId,
        ...dto,
      },
    });
  }

  // ✅ CORRECTO: Verificar que el recurso pertenece al tenant
  async findOne(id: string, tenantId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, tenantId }, // Ambos filtros
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
```

## 🗄️ Row Level Security (RLS) - Preparación

### PrismaService.withTenant()
Método preparado para RLS (actualmente desactivado):

```typescript
// Uso futuro cuando se active RLS
await this.prisma.withTenant(tenantId, async (tx) => {
  // Todas las queries aquí respetarán RLS automáticamente
  const products = await tx.product.findMany(); // Solo del tenant
  const orders = await tx.order.findMany();     // Solo del tenant
  return { products, orders };
});
```

### Pasos para activar RLS (TODO)

1. **Crear políticas en PostgreSQL:**
```sql
-- Ejemplo para tabla products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON products
  USING (tenant_id = current_setting('app.tenant_id')::bigint);

CREATE POLICY tenant_isolation_policy_insert ON products
  FOR INSERT
  WITH CHECK (tenant_id = current_setting('app.tenant_id')::bigint);
```

2. **Descomentar código en PrismaService:**
```typescript
// En src/prisma/prisma.service.ts
async withTenant<T>(tenantId: string, callback: (prisma: PrismaClient) => Promise<T>): Promise<T> {
  // Descomentar estas líneas:
  return this.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(
      `SELECT set_config('app.tenant_id', $1, true)`,
      tenantId.toString()
    );
    return callback(tx as PrismaClient);
  });
}
```

3. **Actualizar services para usar withTenant:**
```typescript
async findAllByTenant(tenantId: string) {
  return this.prisma.withTenant(tenantId, async (tx) => {
    // Ya no necesitas WHERE tenantId, RLS lo hace automático
    return tx.product.findMany();
  });
}
```

## 🔄 Migración a Redis (Producción)

### TokenService en Redis
Para producción, reemplazar el store en memoria:

```typescript
// 1. Instalar Redis
pnpm add ioredis @nestjs/cache-manager cache-manager-ioredis-yet

// 2. Configurar RedisModule en AppModule

// 3. Actualizar TokenService para usar Redis:
async registerToken(jti: string, userId: string, tenantId: string, expiresIn: number) {
  await this.redis.set(
    `token:${jti}`,
    JSON.stringify({ userId, tenantId }),
    'EX',
    expiresIn
  );
}

async isTokenRevoked(jti: string): Promise<boolean> {
  const revoked = await this.redis.get(`revoked:${jti}`);
  return !!revoked;
}

async revokeToken(jti: string): Promise<void> {
  await this.redis.set(`revoked:${jti}`, '1', 'EX', 604800); // 7 días
}
```

## 📝 Resumen de Archivos Clave

### Autenticación
- `src/modules/auth/auth.service.ts` - Login, logout, tokens
- `src/modules/auth/strategies/jwt.strategy.ts` - Validación JWT
- `src/modules/auth/guards/jwt-auth.guard.ts` - Guard de autenticación

### Multi-tenant
- `src/common/decorators/current-tenant.decorator.ts` - @CurrentTenant()
- `src/common/decorators/current-user.decorator.ts` - @CurrentUser()
- `src/common/decorators/tenant-id.decorator.ts` - @TenantId()

### Revocación
- `src/common/services/token.service.ts` - Gestión de JTI

### Base de datos
- `src/prisma/prisma.service.ts` - withTenant() para RLS

## ✅ Checklist de Seguridad

- [x] JWT con tenantId en payload
- [x] JTI único por token
- [x] Validación de tokens activos
- [x] Revocación de tokens por JTI
- [x] Revocación de todas las sesiones de un usuario
- [x] Revocación de todas las sesiones de un tenant
- [x] Guards de autenticación
- [x] Decoradores @CurrentUser y @CurrentTenant
- [x] Patrón de filtrado por tenantId en todos los services
- [x] Preparación para RLS (withTenant)
- [ ] Migrar TokenService a Redis (producción)
- [ ] Activar RLS en PostgreSQL (producción)
- [ ] Implementar rate limiting por tenant
- [ ] Audit logs por tenant
