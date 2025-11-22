# 🏪 BARMENTECH ECOMMERCE | SaaS Multi-Tenant eCommerce Platform

Enterprise-grade multi-tenant eCommerce SaaS platform for tactical equipment and personal defense gear sales. Complete system with production-ready NestJS backend (95%+) and Next.js frontend with App Router.

## 🏗️ General Architecture
```
┌─────────────────────────────────────────────────────────┐
│                BARMENTECH ECOMMERCE Platform             │
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
│  Multi-tenant isolation with Row-Level Security (RLS)    │
│  JWT Authentication with JTI revocation                  │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Project Status

### Backend (✅ 95%+ Production Ready)
- ✅ NestJS + Prisma ORM
- ✅ Multi-tenancy with TenantDomains
- ✅ HostExtraction middleware for routing
- ✅ Row-Level Security (RLS) - 32+ active policies
- ✅ JWT + JTI revocation
- ✅ Rate limiting configured
- ✅ 32+ endpoints implemented
- ✅ Complete validation
- ⏳ Tests (partially completed)

### Frontend (✅ App Router Complete)
- ✅ Pages Router → App Router migration
- ✅ Storefront page with 50 products
- ✅ Responsive admin panel (Apple-style design)
- ✅ Functional cart system
- ✅ JWT authentication modal
- ✅ 1,500+ lines of reusable CSS
- ✅ TypeScript with path aliases
- ✅ Complete backend API integration
- ✅ SSR hydration and multi-tenant support

## 📁 Project Structure

### `/api` Folder - Backend (NestJS + Prisma)
```
api/
├── src/
│   ├── common/                      # Decorators, guards, interceptors
│   │   ├── decorators/              # @CurrentTenant, @CurrentUser, @Roles
│   │   ├── guards/                  # RolesGuard, AuthGuard
│   │   ├── middleware/              # HostExtraction, TenantContext
│   │   └── services/                # TokenService
│   │
│   ├── modules/
│   │   ├── auth/                    # Login, register, JWT, refresh
│   │   ├── tenants/                 # Tenant management
│   │   ├── tenant-domains/          # Domain to tenant mapping
│   │   ├── tenant-users/            # Tenant users
│   │   ├── products/                # Product management
│   │   ├── categories/              # Categories
│   │   ├── orders/                  # Purchase orders
│   │   ├── payments/                # Payment processing
│   │   └── ...other modules
│   │
│   ├── prisma/                      # ORM and migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── app.module.ts                # Root module
│   ├── app.service.ts
│   ├── app.controller.ts
│   └── main.ts                      # Entry point
│
├── prisma/
│   ├── schema.prisma                # Schema definition
│   ├── enable-rls.sql              # Row-Level Security policies
│   └── seed.ts                      # Seed data
│
├── test/                            # E2E tests
├── nest-cli.json                    # NestJS configuration
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies and scripts
```

### `/app` Folder - Frontend (Next.js 16 + App Router)
```
app/
├── app/                             # App Router structure (Next.js 13+)
│   ├── (storefront)/                # Public routes
│   │   ├── page.tsx                 # Home - store with 50 products
│   │   ├── layout.tsx
│   │   └── ...public routes
│   │
│   ├── (platform)/                  # Platform routes
│   │   ├── layout.tsx
│   │   └── ...pages
│   │
│   ├── (tenant-admin)/              # Admin panel for multi-tenancy
│   │   ├── layout.tsx               # With sidebar + topbar
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Dashboard overview
│   │   ├── products/
│   │   │   └── page.tsx             # Product management
│   │   ├── categories/
│   │   │   └── page.tsx             # Category management
│   │   ├── orders/
│   │   │   └── page.tsx             # Orders
│   │   ├── payments/
│   │   │   └── page.tsx             # Payments
│   │   ├── media/
│   │   │   └── page.tsx             # Media manager
│   │   └── settings/
│   │       └── page.tsx             # Settings
│   │
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles (Apple-design)
│   └── middleware.ts                # Next.js middleware
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginModal.tsx       # Authentication modal
│   │   └── shared/
│   │       └── ...components
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
│   │   ├── config.ts                # API config and endpoints
│   │   ├── tenant/
│   │   │   └── tenant.ts            # Tenant utilities
│   │   └── utils/
│   │       └── ...utility functions
│   │
│   └── styles/
│       ├── globals.css              # 1,500+ lines of CSS
│       └── tailwind.css             # Tailwind imports
│
├── public/
│   ├── manifest.json
│   └── themes/                      # Theme assets
│       ├── armas/
│       ├── barmentech/
│       └── ...themes
│
├── .env.local                       # Environment variables
├── next.config.js                   # Next.js config
├── tailwind.config.ts               # Tailwind config
├── tsconfig.json                    # TypeScript config
└── package.json                     # Scripts and dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- pnpm (package manager)
- PostgreSQL 14+
- Docker (optional, for database)

### 1. Backend Setup (NestJS + Prisma)

```bash
cd api

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local

# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# Start development server
pnpm dev
```

**Backend URL:** `http://localhost:3000`
**API Documentation:** `http://localhost:3000/api/docs`

**Available scripts:**
```bash
pnpm dev                    # Development
pnpm build                  # Production build
pnpm start:prod             # Start production
pnpm prisma:generate        # Generate Prisma client
pnpm prisma:migrate         # Create/apply migrations
pnpm prisma:studio          # Open Prisma Studio
pnpm test                   # Run tests
pnpm test:cov               # Tests with coverage
pnpm lint                   # ESLint
pnpm format                 # Prettier
```

### 2. Frontend Setup (Next.js 16 + App Router)

```bash
cd app

# Install dependencies
pnpm install

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
PORT=3001
EOF

# Start development server
pnpm dev -p 3001
```

**Frontend URL:** `http://localhost:3001`

**Available scripts:**
```bash
pnpm dev                    # Development
pnpm build                  # Optimized build
pnpm start                  # Production server
pnpm test                   # Tests
pnpm test:e2e               # E2E tests
pnpm lint                   # ESLint
```

## 📖 Usage Guide

### Frontend - For Developers / Users

#### Access the store
```
http://localhost:3001/
```
- View 50 products with category filtering
- Add products to cart
- Open login modal
- Admin panel at `/admin`

#### Admin Dashboard
```
http://localhost:3001/admin
```
- Dashboard: Overview summary
- Products: Product CRUD operations
- Categories: Category management
- Orders: Order history
- Payments: Payment processing
- Media: File manager
- Settings: Tenant configuration

**Test Credentials:**
- Email: `admin@xxxxxx.com`
- Password: `xxxxxxxxx`
- Tenant ID: `x`

#### Using custom React/Next.js hooks

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
        <p>Welcome {user?.email}</p>
      ) : (
        <button onClick={() => login()}>Login</button>
      )}
      {/* Your code here */}
    </>
  );
}
```

#### Connect to backend API from frontend

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

// With automatic authentication (uses token from localStorage)
```

### Backend - For API Developers

#### Main Endpoints

**Health & System**
```
GET    /health                      - Server status
```

**Authentication**
```
POST   /auth/login                  - Login with email/password + tenantId
POST   /auth/register               - Create account
POST   /auth/logout                 - Logout
POST   /auth/refresh                - Refresh JWT token
```

**Products (Multi-tenant)**
```
GET    /products                    - List tenant products
GET    /products/:id                - Product detail
POST   /products                    - Create product (admin)
PUT    /products/:id                - Update product (admin)
DELETE /products/:id                - Delete product (admin)
```

**Categories**
```
GET    /categories                  - List categories
POST   /categories                  - Create category (admin)
PUT    /categories/:id              - Update category (admin)
DELETE /categories/:id              - Delete category (admin)
```

**Orders (Multi-tenant)**
```
GET    /orders                      - My orders
POST   /orders                      - Create order
GET    /orders/:id                  - Order detail
```

**Payments**
```
GET    /payments                    - List payments
POST   /payments                    - Process payment
GET    /payments/:id                - Payment detail
```

**Admin - Tenant Management**
```
GET    /tenants                     - List my tenants (super-admin)
POST   /tenants                     - Create tenant (super-admin)
GET    /tenants/:id                 - Tenant detail
PATCH  /tenants/:id                 - Update tenant
```

#### Example authenticated request

```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "xxxxx",
    "password": "xxxxxxxxx",
    "tenantId": x
  }'

# Response includes access_token
# Use token in next request:

curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer <access_token>"
```

## 🔄 Multi-Tenant Architecture

### Data Isolation Flow

1. **Client accesses:** `client1.barmentech.com`
2. **HostExtraction middleware:** Extracts hostname
3. **TenantDomains lookup:** Finds tenant_id for domain
4. **TenantContext:** Injects tenantId in each request
5. **Row-Level Security (RLS):** PostgreSQL applies policies automatically
6. **Response:** Only requested tenant data returned

### Multi-Tenant Security

**RLS (Row-Level Security) in PostgreSQL:**
```sql
-- Example policy for products table:
CREATE POLICY "enable_read_for_tenant" ON products
  FOR SELECT
  USING (tenant_id = current_tenant_id);

-- 32+ policies total for all tables
```

**Backend Isolation:**
- Decorators: `@CurrentTenant()`, `@CurrentUser()`, `@Roles()`
- Guards: Validates authentication and authorization
- Middleware: Injects tenantId in context
- JWT: Includes `tenantId` and `userId` in payload

**Token Flow:**
```
Login → JTI generated → Token with tenantId + userId
  ↓
Request with Authorization header
  ↓
Passport validates JWT + JTI (revocation)
  ↓
Decorators extract tenantId from token
  ↓
RLS in PostgreSQL filters data automatically
```

## 📊 Database

### Stack
- **Engine:** PostgreSQL 14+
- **ORM:** Prisma
- **Versioning:** Prisma Migrations
- **Security:** Row-Level Security (RLS)

### Main Schema

**Multi-Tenant Tables:**
```
tenants              - Virtual store information
├─ id (PK)
├─ name
├─ slug
└─ settings (JSON)

tenant_domains       - Domain to tenant mapping
├─ id (PK)
├─ tenant_id (FK)
└─ domain

users                - Users (admin + customers)
├─ id (PK)
├─ tenant_id (FK)
├─ email
├─ password (hash)
├─ role (ADMIN|CUSTOMER|SUPER_ADMIN)
└─ RLS: access own tenant only

products             - Product catalog
├─ id (PK)
├─ tenant_id (FK)
├─ name
├─ price
├─ category_id
└─ RLS: view tenant products only

categories           - Product categories
├─ id (PK)
├─ tenant_id (FK)
├─ name
└─ RLS: tenant only

orders               - Purchase orders
├─ id (PK)
├─ tenant_id (FK)
├─ user_id (FK)
├─ total
├─ status
└─ RLS: tenant orders only

order_items          - Order details
├─ id (PK)
├─ order_id (FK)
└─ product_id (FK)

cart_items           - Temporary cart
├─ id (PK)
├─ tenant_id (FK)
├─ user_id (FK)
├─ product_id (FK)
└─ quantity
```

### Migrations

```bash
# Create new migration
pnpm prisma migrate dev --name migration_name

# Apply migrations in production
pnpm prisma migrate deploy

# Reset database (development only)
pnpm prisma migrate reset

# Check migration status
pnpm prisma migrate status
```

### Seed test data

```bash
# Seed script populates database
pnpm prisma db seed
```

## 🔐 Security

- ✅ JWT with JTI for revocation
- ✅ Row-Level Security (RLS) in PostgreSQL
- ✅ Rate limiting on endpoints
- ✅ CORS configured
- ✅ Input validation (NestJS pipes)
- ✅ Password hashing (bcrypt)
- ✅ OTP for 2FA

## 📦 Environment Variables

### Backend - `/api/.env.local`
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/xxxxxxxx
DATABASE_SSL=false

# JWT & Authentication
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3001

# Server
PORT=3000
NODE_ENV=development

# Rate Limiting (optional)
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

See `.env.example` in each folder for complete references.

## 🧪 Testing

### Backend (NestJS)
```bash
cd api

# Unit tests
pnpm test

# Tests in watch mode
pnpm test:watch

# Tests with coverage
pnpm test:cov

# E2E tests
pnpm test:e2e
```

### Frontend (Next.js)
```bash
cd app

# Tests with Vitest
pnpm test

# Tests in watch mode
pnpm test:watch

# E2E tests with Playwright
pnpm test:e2e

# E2E tests UI mode
pnpm test:e2e:ui
```

### Debugging

**Backend - Logs with debug:**
```bash
DEBUG=nestjs:* pnpm dev
```

**Frontend - Browser DevTools:**
```
F12 → Network tab to see API requests
Console tab for AuthContext logs
Storage tab to view tokens in localStorage
```

## 🚧 Roadmap

### Phase 1: Current Optimization (In Progress)
- [ ] Complete tests (unit + e2e)
- [ ] Optimize admin panel performance
- [ ] Add pagination to lists
- [ ] Implement product search

### Phase 2: Payments & Checkout
- [ ] Complete checkout page
- [ ] Stripe / PayPal integration
- [ ] Confirmation email
- [ ] Order tracking

### Phase 3: User Dashboard
- [ ] User profile
- [ ] Order history
- [ ] Wishlist
- [ ] Saved addresses
- [ ] Product reviews

### Phase 4: Advanced Features
- [ ] Analytics and reports
- [ ] Inventory management
- [ ] Coupon system
- [ ] Email marketing tools
- [ ] Customer support ticketing
- [ ] Multi-currency support

## 🔐 Implementation Security

**Implemented:**
- ✅ JWT with JTI for token revocation
- ✅ Row-Level Security (RLS) in PostgreSQL
- ✅ Rate limiting on endpoints
- ✅ CORS configured
- ✅ Input validation (NestJS pipes)
- ✅ Password hashing (bcrypt)
- ✅ Multi-tenant data isolation
- ✅ HTTPS ready

**Credentials:** 
All secrets and credentials MUST be in `.env.local` files, NEVER in code or git.

---

**Last updated:** November 2025
**Version:** 1.0.0
