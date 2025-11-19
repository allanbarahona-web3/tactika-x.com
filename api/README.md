# Tactika-X Backend API

API backend multi-tenant para plataforma SaaS de tiendas virtuales (e-commerce).

## 🚀 Stack Tecnológico

- **Framework**: NestJS
- **ORM**: Prisma
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT (Passport)
- **Arquitectura**: Multi-tenant con `tenantId`

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install

# Copiar archivo de entorno
cp .env.example .env

# Generar cliente de Prisma
pnpm prisma:generate

# Ejecutar migraciones
pnpm prisma:migrate
```

## 🏗️ Estructura del Proyecto

```
src/
├── modules/           # Módulos de negocio
│   ├── auth/         # Autenticación y autorización
│   ├── tenants/      # Gestión de tiendas (tenants)
│   ├── products/     # Productos
│   └── orders/       # Órdenes de compra
├── common/           # Código compartido
│   ├── decorators/   # Decoradores personalizados
│   ├── guards/       # Guards de autenticación/autorización
│   ├── interceptors/ # Interceptors
│   └── filters/      # Exception filters
├── prisma/           # Configuración de Prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev                  # Iniciar servidor en modo desarrollo

# Build
pnpm build                # Compilar para producción
pnpm start:prod           # Iniciar servidor en producción

# Prisma
pnpm prisma:generate      # Generar cliente de Prisma
pnpm prisma:migrate       # Crear y aplicar migración
pnpm prisma:studio        # Abrir Prisma Studio

# Testing
pnpm test                 # Ejecutar tests
pnpm test:watch           # Tests en modo watch
pnpm test:cov             # Tests con cobertura

# Linting
pnpm lint                 # Ejecutar ESLint
pnpm format               # Formatear código con Prettier
```

## 🗄️ Base de Datos

### Configuración Multi-tenant

Todas las tablas de negocio incluyen `tenantId` para aislar los datos de cada tienda:

- **Tenant**: Información de cada tienda virtual
- **User**: Usuarios (admin y clientes) por tienda
- **Product**: Productos de cada tienda
- **Order**: Órdenes de compra por tienda

### Migraciones

```bash
# Crear nueva migración
pnpm prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
pnpm prisma migrate deploy

# Resetear base de datos (solo desarrollo)
pnpm prisma migrate reset
```

## 🔐 Autenticación

Sistema de autenticación JWT con roles:

- **SUPER_ADMIN**: Administrador de la plataforma
- **ADMIN**: Administrador de tienda
- **CUSTOMER**: Cliente de tienda

## 🌐 API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Health Check
- `GET /health` - Estado del servidor

### Autenticación (próximamente)
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/me` - Obtener usuario actual

### Tenants (próximamente)
- `GET /tenants` - Listar tiendas
- `POST /tenants` - Crear tienda
- `GET /tenants/:id` - Obtener tienda
- `PATCH /tenants/:id` - Actualizar tienda

## 🚧 Próximos Pasos

1. Implementar módulo de autenticación JWT
2. Crear guards para multi-tenancy
3. Implementar módulos de negocio (products, orders)
4. Configurar Row Level Security (RLS) en PostgreSQL
5. Añadir tests unitarios y e2e

## 📝 Variables de Entorno

Ver archivo `.env.example` para las variables requeridas.

## 👨‍💻 Autor

Allan Barahona - Tactika-X Platform
