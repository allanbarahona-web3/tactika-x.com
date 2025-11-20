# 🏪 TACTIKA-X | SaaS Multi-Tenant eCommerce Platform

## 📋 Descripción del Proyecto

Plataforma ecommerce SaaS multi-tenant para vender equipamiento táctico y defensa personal. Sistema completo con backend NestJS (100% producción) y frontend Next.js (recién migrado a App Router).

### Arquitetura General
```
┌─────────────────────────────────────────────────────────┐
│                    TACTIKA-X Platform                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Frontend (Next.js 16 + App Router)     Backend (NestJS)│
│  ├─ Storefront                          ├─ Multi-Tenant │
│  ├─ Admin Dashboard                     ├─ RLS Policies │
│  ├─ User Profile                        ├─ JWT + JTI    │
│  ├─ Cart & Checkout                     ├─ Rate Limit   │
│  └─ Auth (Login/Register)               └─ 32 Endpoints│
│                                                           │
│  Conectados vía HTTP REST + JWT Bearer                   │
│  Base de datos: PostgreSQL (shared database con RLS)     │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Estado Actual del Proyecto

### Backend (✅ 95% + Listo)
- ✅ Multi-tenancy con TenantDomains
- ✅ HostExtraction middleware
- ✅ Row-Level Security (RLS) - 32 políticas activas
- ✅ JWT + JTI revocation
- ✅ Rate limiting
- ✅ 32+ endpoints implementados
- ✅ Validación completa
- ⏳ Tests (algunas partes completadas)

### Frontend (✅ JUSTO MIGRADO a App Router)
- ✅ Migración Pages Router → App Router (COMPLETADO)
- ✅ Página de storefront con 50 productos
- ✅ Panel admin con gestión
- ✅ Sistema de carrito funcional
- ✅ Modal de login con OTP
- ✅ 1,500+ líneas de CSS reutilizado
- ✅ TypeScript con path aliases
- ⏳ Integración con backend API

## 📁 Estructura del Proyecto

### Carpeta `/api` (Backend NestJS)
```
api/
├── src/
│   ├── common/              # Guards, pipes, decorators
│   ├── auth/                # Autenticación
│   ├── products/            # Gestión de productos
│   ├── orders/              # Gestión de órdenes
│   ├── customers/           # Gestión de clientes
│   ├── tenants/             # Multi-tenancy
│   ├── app.module.ts
│   └── main.ts
├── test/                    # Tests e2e
├── docker-compose.yml       # PostgreSQL + Redis
└── package.json
```

### Carpeta `/app` (Frontend Next.js)
```
app/
├── app/                     # ← App Router (NEW)
│   ├── (storefront)/        # Rutas públicas
│   │   ├── page.tsx         # Home con 50 productos
│   │   └── layout.tsx
│   ├── (admin)/             # Rutas admin
│   │   ├── dashboard/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx           # Root layout
│   └── globals.css          # 1,500+ líneas CSS
│
├── components/              # Componentes reutilizables
│   └── auth/LoginModalContent.tsx
│
├── hooks/                   # Custom hooks
│   ├── useCart.ts          # Gestión de carrito
│   ├── useProducts.ts      # Filtrado de productos
│   └── useAuth.ts          # Autenticación
│
├── lib/                     # Utilidades compartidas
│   ├── api.ts              # Cliente HTTP
│   ├── config.ts           # Configuración
│   └── data/
│       └── products.ts     # 50 productos + categorías
│
├── public/                  # Activos estáticos
├── next.config.js          # Config Next.js
├── tsconfig.json           # TypeScript config
└── package.json
```

## 🛠️ Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- pnpm (npm install -g pnpm)
- PostgreSQL 14+
- Docker (opcional, para base de datos)

### Backend Setup

```bash
cd api

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Levantar base de datos (Docker)
docker-compose up -d

# Ejecutar migraciones
pnpm run typeorm migration:run

# Iniciar servidor
pnpm dev
```

**URL Backend:** http://localhost:3001

### Frontend Setup

```bash
cd app

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

# Iniciar servidor de desarrollo
pnpm dev
```

**URL Frontend:** http://localhost:3000

## 📖 Guía de Uso

### Para Desarrolladores Frontend

#### Acceder a la tienda
```
http://localhost:3000/
```
- Ver 50 productos con filtrado por categoría
- Agregar productos al carrito
- Abrir modal de login
- Panel de admin en `/dashboard`

#### Usar los hooks personalizados

```tsx
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const { cart, addToCart } = useCart();
  const { products, selectedCategory, handleCategoryChange } = useProducts();
  const { user, isAuthenticated, login } = useAuth();

  // Tu código aquí
}
```

#### Conectar con backend API

```tsx
import { apiClient } from '@/lib/api';
import { API_CONFIG } from '@/lib/config';

// GET
const products = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS);

// POST
const order = await apiClient.post(
  API_CONFIG.ENDPOINTS.ORDERS,
  { productIds: [1, 2, 3] }
);

// Con autenticación automática (usa token del localStorage)
```

### Para Desarrolladores Backend

#### Endpoints principales

**Autenticación**
```
POST   /auth/login            - Login con email/password
POST   /auth/register         - Crear cuenta
POST   /auth/otp              - Generar OTP
POST   /auth/verify-2fa       - Verificar 2FA
POST   /auth/refresh          - Refrescar token
POST   /auth/logout           - Logout
```

**Productos**
```
GET    /products              - Listar productos
GET    /products/:id          - Detalle producto
GET    /categories            - Listar categorías
```

**Órdenes**
```
GET    /orders                - Mis órdenes
POST   /orders                - Crear orden
GET    /orders/:id            - Detalle orden
```

**Admin**
```
GET    /admin/products        - Listar productos
POST   /admin/products        - Crear producto
PUT    /admin/products/:id    - Editar producto
DELETE /admin/products/:id    - Eliminar producto
GET    /admin/orders          - Ver todas órdenes
GET    /admin/customers       - Ver todos clientes
```

## 🔄 Flujo Multi-Tenant

1. **Cliente accede:** `cliente1.tactika-x.com`
2. **HostExtraction middleware:** Extrae hostname
3. **Lookup en TenantDomains:** Busca tenant_id
4. **RLS aplica:** Solo muestra datos del tenant
5. **JWT valida:** Verifica autenticación y JTI
6. **Response:** Datos filtrados por tenant

```sql
-- Las RLS policies aseguran:
-- - Solo ver productos del mismo tenant
-- - Solo actualizar órdenes propias
-- - Admin solo de su tenant
-- 32 políticas en total
```

## 📊 Base de Datos

### Schema Principal
```sql
tenants                    -- Multi-tenancy
tenant_domains            -- Mapeo de dominios
users                     -- Usuarios (RLS habilitado)
products                  -- Productos (RLS habilitado)
categories                -- Categorías
cart_items               -- Carrito del usuario
orders                   -- Órdenes (RLS habilitado)
order_items              -- Items de órdenes
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

### Backend (.env)
```env
# Base de datos
DATABASE_URL=postgresql://user:pass@localhost:5432/tactika_x

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=7d

# Redis (opcional)
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:3000

# Nodemailer (para emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=TACTIKA-X
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🧪 Testing

### Backend
```bash
cd api

# Tests unitarios
pnpm run test

# Tests e2e
pnpm run test:e2e

# Coverage
pnpm run test:cov
```

### Frontend
```bash
cd app

# Tests (Vitest)
pnpm test

# E2E (Playwright)
pnpm test:e2e
```

## 📋 Roadmap Próximas Fases

### Fase 1: Integración API (En Progreso)
- [ ] Conectar login con backend
- [ ] Cargar productos desde API
- [ ] Crear órdenes en backend
- [ ] Sincronizar carrito con servidor
- [ ] Implementar refresh token

### Fase 2: Checkout & Pagos
- [ ] Página de checkout
- [ ] Integración Stripe/PayPal
- [ ] Email de confirmación
- [ ] Tracking de órdenes

### Fase 3: User Dashboard
- [ ] Perfil de usuario
- [ ] Historial de órdenes
- [ ] Wishlist
- [ ] Direcciones guardadas
- [ ] Reviews de productos

### Fase 4: Admin Advanced
- [ ] Analytics y reportes
- [ ] Gestión de inventario
- [ ] Sistema de cupones
- [ ] Email marketing
- [ ] Customer support ticketing

## 🤝 Contribuir

1. Fork el repo
2. Crea rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a rama (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 👨‍💻 Autor

**Barmentech Web Developer**
- Email: contact@barmentech.com
- GitHub: [@barmentech](https://github.com/barmentech)

## 📞 Soporte

Para reportar bugs o sugerencias:
1. GitHub Issues
2. Email: support@tactika-x.com
3. WhatsApp: +506 1234-5678

---

**Última actualización:** Noviembre 2024
**Versión:** 1.0.0 (Migration to App Router Complete)
