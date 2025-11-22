# 🏪 TACTIKA-X | SaaS Multi-Tenant eCommerce Platform

Plataforma ecommerce SaaS multi-tenant para vender equipamiento táctico y defensa personal. Sistema completo con backend NestJS (95%+ producción) y frontend Next.js con App Router.

## 🏗️ Arquitetura General
```
┌─────────────────────────────────────────────────────────┐
│                    TACTIKA-X Platform                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Frontend (Next.js 16 + App Router)     Backend (NestJS) │
│  ├─ Storefront                          ├─ Multi-Tenant  │
│  ├─ Admin Dashboard                     ├─ RLS Policies  │
│  ├─ User Profile                        ├─ JWT + JTI     │
│  ├─ Cart & Checkout                     ├─ Rate Limit    │
│  └─ Auth (Login/Register)               └─ 32+ Endpoints │
│                                                           │
│  Stack: NestJS + Prisma + PostgreSQL + Next.js           │
│  Multi-tenant isolation con Row-Level Security (RLS)     │
│  Autenticación JWT con revocación JTI                    │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Estado Actual del Proyecto

### Backend (✅ 95%+ Listo)
- ✅ NestJS + Prisma ORM
- ✅ Multi-tenancy con TenantDomains
- ✅ HostExtraction middleware para routing
- ✅ Row-Level Security (RLS) - 32+ políticas activas
- ✅ JWT + JTI revocation
- ✅ Rate limiting configurado
- ✅ 32+ endpoints implementados
- ✅ Validación completa
- ⏳ Tests (parcialmente completados)

### Frontend (✅ App Router Completo)
- ✅ Migración Pages Router → App Router
- ✅ Página de storefront con 50 productos
- ✅ Panel admin responsivo (Apple-style design)
- ✅ Sistema de carrito funcional
- ✅ Modal de login con autenticación JWT
- ✅ 1,500+ líneas de CSS reutilizado
- ✅ TypeScript con path aliases
- ✅ Integración completa con backend API
- ✅ SSR hydration y multi-tenant support

## 📁 Estructura del Proyecto

### Carpeta `/api` - Backend (NestJS + Prisma)
```
api/
├── src/
│   ├── common/                      # Decoradores, guards, interceptors
│   │   ├── decorators/              # @CurrentTenant, @CurrentUser, @Roles
│   │   ├── guards/                  # RolesGuard, AuthGuard
│   │   ├── middleware/              # HostExtraction, TenantContext
│   │   └── services/                # TokenService
│   │
│   ├── modules/
│   │   ├── auth/                    # Login, register, JWT, refresh
│   │   ├── tenants/                 # Gestión de tenants
│   │   ├── tenant-domains/          # Mapeo de dominios a tenants
│   │   ├── tenant-users/            # Usuarios por tenant
│   │   ├── products/                # Gestión de productos
│   │   ├── categories/              # Categorías
│   │   ├── orders/                  # Órdenes de compra
│   │   ├── payments/                # Procesamiento de pagos
│   │   └── ...otros módulos
│   │
│   ├── prisma/                      # ORM y migraciones
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── app.module.ts                # Root module
│   ├── app.service.ts
│   ├── app.controller.ts
│   └── main.ts                      # Entry point
│
├── prisma/
│   ├── schema.prisma                # Definición del schema
│   ├── enable-rls.sql              # Políticas Row-Level Security
│   └── seed.ts                      # Datos iniciales
│
├── test/                            # Tests e2e
├── nest-cli.json                    # Configuración NestJS
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencias y scripts
```

### Carpeta `/app` - Frontend (Next.js 16 + App Router)
```
app/
├── app/                             # App Router structure (Next.js 13+)
│   ├── (storefront)/                # Rutas públicas
│   │   ├── page.tsx                 # Home - tienda con 50 productos
│   │   ├── layout.tsx
│   │   └── ...rutas públicas
│   │
│   ├── (platform)/                  # Rutas plataforma
│   │   ├── layout.tsx
│   │   └── ...páginas
│   │
│   ├── (tenant-admin)/              # Admin panel multitenancy
│   │   ├── layout.tsx               # Con sidebar + topbar
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Dashboard overview
│   │   ├── products/
│   │   │   └── page.tsx             # Gestión productos
│   │   ├── categories/
│   │   │   └── page.tsx             # Gestión categorías
│   │   ├── orders/
│   │   │   └── page.tsx             # Órdenes
│   │   ├── payments/
│   │   │   └── page.tsx             # Pagos
│   │   ├── media/
│   │   │   └── page.tsx             # Gestor de medios
│   │   └── settings/
│   │       └── page.tsx             # Configuración
│   │
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles (Apple-design)
│   └── middleware.ts                # Next.js middleware
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginModal.tsx       # Modal de autenticación
│   │   └── shared/
│   │       └── ...componentes
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx          # Auth state management
│   │
│   ├── hooks/
│   │   ├── useAuth.ts               # Auth hook
│   │   ├── useCart.ts               # Cart management
│   │   ├── useProducts.ts           # Product filtering
│   │   └── ...custom hooks
│   │
│   ├── lib/
│   │   ├── api.ts                   # HTTP client wrapper
│   │   ├── config.ts                # API config y endpoints
│   │   ├── tenant/
│   │   │   └── tenant.ts            # Tenant utilities
│   │   └── utils/
│   │       └── ...utility functions
│   │
│   └── styles/
│       ├── globals.css              # 1,500+ líneas CSS
│       └── tailwind.css             # Tailwind imports
│
├── public/
│   ├── manifest.json
│   └── themes/                      # Assets por tema
│       ├── armas/
│       ├── barmentech/
│       └── ...temas
│
├── .env.local                       # Env variables
├── next.config.js                   # Next.js config
├── tailwind.config.ts               # Tailwind config
├── tsconfig.json                    # TypeScript config
└── package.json                     # Scripts y dependencias
```

## 🛠️ Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- pnpm (gestor de paquetes)
- PostgreSQL 14+
- Docker (opcional, para base de datos)

### 1. Backend Setup (NestJS + Prisma)

```bash
cd api

# Instalar dependencias
pnpm install

# Copiar archivo de entorno
cp .env.example .env.local

# Generar cliente de Prisma
pnpm prisma:generate

# Ejecutar migraciones
pnpm prisma:migrate

# Iniciar servidor en modo desarrollo
pnpm dev
```

**URL Backend:** `http://localhost:3000`
**Documentación API:** `http://localhost:3000/api/docs`

**Scripts disponibles:**
```bash
pnpm dev                    # Desarrollo
pnpm build                  # Build producción
pnpm start:prod             # Iniciar producción
pnpm prisma:generate        # Generar cliente Prisma
pnpm prisma:migrate         # Crear/aplicar migraciones
pnpm prisma:studio          # Abrir Prisma Studio
pnpm test                   # Ejecutar tests
pnpm test:cov               # Tests con cobertura
pnpm lint                   # ESLint
pnpm format                 # Prettier
```

### 2. Frontend Setup (Next.js 16 + App Router)

```bash
cd app

# Instalar dependencias
pnpm install

# Crear archivo de entorno
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
PORT=3001
EOF

# Iniciar servidor de desarrollo
pnpm dev -p 3001
```

**URL Frontend:** `http://localhost:3001`

**Scripts disponibles:**
```bash
pnpm dev                    # Desarrollo
pnpm build                  # Build optimizado
pnpm start                  # Servidor producción
pnpm test                   # Tests
pnpm test:e2e               # E2E tests
pnpm lint                   # ESLint
```

## 📖 Guía de Uso

### Frontend - Para Desarrolladores / Usuarios

#### Acceder a la tienda
```
http://localhost:3001/
```
- Ver 50 productos con filtrado por categoría
- Agregar productos al carrito
- Abrir modal de login
- Admin panel en `/admin`

#### Admin Dashboard
```
http://localhost:3001/admin
```
- Dashboard: Overview con resumen
- Products: CRUD de productos
- Categories: Gestión de categorías
- Orders: Historial de órdenes
- Payments: Procesamiento de pagos
- Media: Gestor de archivos
- Settings: Configuración de tenant

**Credenciales de prueba:**
- Email: `admin@barmentech.com`
- Password: `password123`
- Tenant ID: `1`

#### Usar los hooks personalizados en React/Next.js

```tsx
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { cart, addToCart, removeFromCart, total } = useCart();
  const { products, selectedCategory, handleCategoryChange } = useProducts();

  return (
    <>
      {isAuthenticated ? (
        <p>Bienvenido {user?.email}</p>
      ) : (
        <button onClick={() => login()}>Login</button>
      )}
      {/* Tu código aquí */}
    </>
  );
}
```

#### Conectar con backend API desde frontend

```tsx
import { apiClient } from '@/lib/api';
import { API_CONFIG } from '@/lib/config';

// GET products
const products = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS);

// POST order
const order = await apiClient.post(
  API_CONFIG.ENDPOINTS.ORDERS,
  { 
    items: [{ productId: 1, quantity: 2 }]
  }
);

// Con autenticación automática (usa token del localStorage)
```

### Backend - Para Desarrolladores de API

#### Endpoints principales

**Health & System**
```
GET    /health                      - Estado del servidor
```

**Autenticación**
```
POST   /auth/login                  - Login con email/password + tenantId
POST   /auth/register               - Crear cuenta
POST   /auth/logout                 - Logout
POST   /auth/refresh                - Refrescar token JWT
```

**Productos (Multi-tenant)**
```
GET    /products                    - Listar productos del tenant
GET    /products/:id                - Detalle producto
POST   /products                    - Crear producto (admin)
PUT    /products/:id                - Editar producto (admin)
DELETE /products/:id                - Eliminar producto (admin)
```

**Categorías**
```
GET    /categories                  - Listar categorías
POST   /categories                  - Crear categoría (admin)
PUT    /categories/:id              - Editar categoría (admin)
DELETE /categories/:id              - Eliminar categoría (admin)
```

**Órdenes (Multi-tenant)**
```
GET    /orders                      - Mis órdenes
POST   /orders                      - Crear orden
GET    /orders/:id                  - Detalle orden
```

**Pagos**
```
GET    /payments                    - Listar pagos
POST   /payments                    - Procesar pago
GET    /payments/:id                - Detalle pago
```

**Admin - Tenant Management**
```
GET    /tenants                     - Listar mis tenants (super-admin)
POST   /tenants                     - Crear tenant (super-admin)
GET    /tenants/:id                 - Detalle tenant
PATCH  /tenants/:id                 - Actualizar tenant
```

#### Ejemplo de request autenticado

```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@barmentech.com",
    "password": "password123",
    "tenantId": 1
  }'

# Response incluye access_token
# Usar token en siguiente request:

curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer <access_token>"
```

## 🔄 Arquitectura Multi-Tenant

### Flujo de Aislamiento de Datos

1. **Cliente accede:** `cliente1.tactika-x.com`
2. **HostExtraction middleware:** Extrae hostname
3. **Lookup en TenantDomains:** Busca tenant_id del dominio
4. **TenantContext:** Se inyecta tenantId en cada request
5. **Row-Level Security (RLS):** PostgreSQL aplica políticas automáticas
6. **Response:** Solo datos del tenant solicitado

### Seguridad Multi-Tenant

**RLS (Row-Level Security) en PostgreSQL:**
```sql
-- Ejemplo de política para tabla products:
CREATE POLICY "enable_read_for_tenant" ON products
  FOR SELECT
  USING (tenant_id = current_tenant_id);

-- 32+ políticas en total para todas las tablas
```

**Aislamiento en Backend:**
- Decoradores: `@CurrentTenant()`, `@CurrentUser()`, `@Roles()`
- Guards: Valida autenticación y autorización
- Middleware: Inyecta tenantId en contexto
- JWT: Incluye `tenantId` y `userId` en payload

**Flujo de Token:**
```
Login → JTI generado → Token con tenantId + userId
  ↓
Request con Authorization header
  ↓
Passport valida JWT + JTI (revocación)
  ↓
Decoradores extraen tenantId del token
  ↓
RLS en PostgreSQL filtra datos automáticamente
```

## 📊 Base de Datos

### Stack
- **Motor:** PostgreSQL 14+
- **ORM:** Prisma
- **Versionado:** Prisma Migrations
- **Seguridad:** Row-Level Security (RLS)

### Schema Principal

**Tablas Multi-Tenant:**
```
tenants              - Información de cada tienda virtual
├─ id (PK)
├─ name
├─ slug
└─ settings (JSON)

tenant_domains       - Mapeo de dominios a tenants
├─ id (PK)
├─ tenant_id (FK)
└─ domain

users                - Usuarios (admin + customers)
├─ id (PK)
├─ tenant_id (FK)
├─ email
├─ password (hash)
├─ role (ADMIN|CUSTOMER|SUPER_ADMIN)
└─ RLS: solo acceso a propio tenant

products             - Catálogo de productos
├─ id (PK)
├─ tenant_id (FK)
├─ name
├─ price
├─ category_id
└─ RLS: solo ver productos del tenant

categories           - Categorías de productos
├─ id (PK)
├─ tenant_id (FK)
├─ name
└─ RLS: solo del tenant

orders               - Órdenes de compra
├─ id (PK)
├─ tenant_id (FK)
├─ user_id (FK)
├─ total
├─ status
└─ RLS: solo órdenes del tenant

order_items          - Detalles de órdenes
├─ id (PK)
├─ order_id (FK)
└─ product_id (FK)

cart_items           - Carrito temporal
├─ id (PK)
├─ tenant_id (FK)
├─ user_id (FK)
├─ product_id (FK)
└─ quantity
```

### Migraciones

```bash
# Crear nueva migración
pnpm prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
pnpm prisma migrate deploy

# Resetear BD (solo desarrollo)
pnpm prisma migrate reset

# Ver estado de migraciones
pnpm prisma migrate status
```

### Generar datos de prueba

```bash
# Seed script populate base de datos
pnpm prisma db seed
```

## 🔐 Seguridad

- ✅ JWT con JTI para revocación
- ✅ Row-Level Security (RLS) en PostgreSQL
- ✅ Rate limiting en endpoints
- ✅ CORS configurado
- ✅ Validación de input (pipes NestJS)
- ✅ Password hashing (bcrypt)
- ✅ OTP para 2FA

## 📦 Variables de Entorno

### Backend - `/api/.env.local`
```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/tactika_x
DATABASE_SSL=false

# JWT & Autenticación
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3001

# Server
PORT=3000
NODE_ENV=development

# Rate Limiting (opcional)
RATE_LIMIT_TTL=900000
RATE_LIMIT_MAX=100
```

### Frontend - `/app/.env.local`
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Server
PORT=3001
```

Ver `.env.example` en cada carpeta para referencias completas.

## 🧪 Testing

### Backend (NestJS)
```bash
cd api

# Tests unitarios
pnpm test

# Tests en modo watch
pnpm test:watch

# Tests con cobertura
pnpm test:cov

# Tests e2e
pnpm test:e2e
```

### Frontend (Next.js)
```bash
cd app

# Tests con Vitest
pnpm test

# Tests en modo watch
pnpm test:watch

# E2E tests con Playwright
pnpm test:e2e

# E2E tests UI mode
pnpm test:e2e:ui
```

### Debugging

**Backend - Backend logs con debug:**
```bash
DEBUG=nestjs:* pnpm dev
```

**Frontend - Browser DevTools:**
```
F12 → Network tab para ver requests a API
Console tab para AuthContext logs
Storage tab para ver tokens en localStorage
```

## 🚧 Roadmap

### Fase 1: Optimización Actual (En Progreso)
- [ ] Completar tests (unitarios + e2e)
- [ ] Optimizar performance del admin panel
- [ ] Agregar paginación en listados
- [ ] Implementar búsqueda de productos

### Fase 2: Pagos & Checkout
- [ ] Página de checkout completa
- [ ] Integración Stripe / PayPal
- [ ] Email de confirmación
- [ ] Tracking de órdenes

### Fase 3: User Dashboard
- [ ] Perfil de usuario
- [ ] Historial de órdenes
- [ ] Wishlist
- [ ] Direcciones guardadas
- [ ] Reviews de productos

### Fase 4: Advanced Features
- [ ] Analytics y reportes
- [ ] Gestión de inventario
- [ ] Sistema de cupones y promociones
- [ ] Email marketing tools
- [ ] Customer support ticketing
- [ ] Multi-currency support

## 🔐 Seguridad

**Implementado:**
- ✅ JWT con JTI para revocación de tokens
- ✅ Row-Level Security (RLS) en PostgreSQL
- ✅ Rate limiting en endpoints
- ✅ CORS configurado
- ✅ Validación de input (NestJS pipes)
- ✅ Password hashing (bcrypt)
- ✅ Multi-tenant data isolation
- ✅ HTTPS ready

**Credenciales:** 
Todos los secretos y credenciales DEBEN estar en archivos `.env.local`, NUNCA en código o git.

---

**Última actualización:** Noviembre 2024
**Versión:** 1.0.0
