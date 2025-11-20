# 🚀 QUICK START GUIDE

## 5 Minutos para Empezar

### 1️⃣ Clonar y Setup del Backend (NestJS)

```bash
cd api
pnpm install
docker-compose up -d      # Inicia PostgreSQL
pnpm run typeorm migration:run
pnpm dev
```

**Backend corriendo en:** http://localhost:3001

### 2️⃣ Setup del Frontend (Next.js App Router)

```bash
cd app
pnpm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
pnpm dev
```

**Frontend corriendo en:** http://localhost:3000

### 3️⃣ Acceder a la App

- **Tienda:** http://localhost:3000/ (50 productos, carrito, login)
- **Admin:** http://localhost:3000/dashboard (gestión de productos)
- **API Docs:** http://localhost:3001/api/docs (Swagger)

## 📁 Estructura Actual

```
tactika-x/
├── api/                 (Backend NestJS - 100% listo)
│   ├── src/
│   ├── docker-compose.yml
│   └── package.json
│
├── app/                 (Frontend Next.js - APP ROUTER NUEVO!)
│   ├── app/             ← App Router (pages, layouts)
│   ├── components/      ← Componentes reutilizables
│   ├── hooks/           ← Custom hooks
│   ├── lib/             ← Utilidades (API client, config, datos)
│   └── package.json
│
└── README.md
```

## ✨ Qué Cambió (App Router Migration)

### ❌ Antes (Pages Router - DEPRECADO)
```
pages/
  index.tsx         (1,245 líneas monolítica)
  admin.tsx         (164 líneas)
  login.tsx         (85 líneas)
```

### ✅ Ahora (App Router - NUEVO)
```
app/
  (storefront)/
    page.tsx        (Home - 633 líneas)
  (admin)/
    dashboard/page.tsx  (Admin - 290 líneas)
  layout.tsx        (Root layout)
  globals.css       (1,500+ líneas CSS reutilizado)
```

## 🎯 Funciones Principales

### 🛍️ Storefront (HOME)
- [x] 50 productos en catálogo
- [x] 8 categorías con filtrado
- [x] Carrito funcional (add, remove, quantity)
- [x] Modal de login con OTP y 2FA
- [x] Footer con contacto
- [x] WhatsApp button

### 👨‍💼 Admin Dashboard
- [x] Tabla de productos
- [x] Agregar/editar productos (modal)
- [x] Eliminar productos
- [x] Tabla de órdenes
- [x] Tabla de clientes
- [x] Configuración de tienda

## 🔧 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | Next.js | 16.0.1 |
| UI Framework | React | 19 |
| Lenguaje | TypeScript | 5.7 |
| Estilo | CSS + CSS Variables | Plain CSS |
| Estado | React Hooks | Nativa |
| HTTP Client | Fetch API | Nativa |
| Build Tool | Turbopack | Integrado |
| Backend | NestJS | 10.x |
| Base de Datos | PostgreSQL | 14+ |
| Auth | JWT + JTI | NestJS Auth |

## 📊 Recursos

| Recurso | Cantidad | Estado |
|---------|----------|--------|
| Productos | 50 | ✅ Listos |
| Categorías | 8 | ✅ Funcionales |
| Pages | 2 | ✅ Implementadas |
| Componentes | 1+ | ✅ Modulares |
| Hooks | 3 | ✅ Listos |
| Estilos | 1,500+ líneas | ✅ Reutilizado |
| API Endpoints | 20+ | ✅ Documentados |
| Compilación | TypeScript | ✅ Sin errores |

## 🎮 Cómo Probar

### Producto: Agregar al Carrito
```
1. Abre http://localhost:3000/
2. Haz scroll a "Nuestros Productos"
3. Haz click en "Agregar" en cualquier producto
4. Carrito se actualiza automáticamente
5. Click en ícono del carrito para ver modal
```

### Carrito: Cambiar Cantidad
```
1. Abre modal del carrito
2. Usa botones + y - para cambiar cantidad
3. Total se actualiza en tiempo real
4. Click en X para eliminar del carrito
```

### Categorías: Filtrar Productos
```
1. En navegación (barra negra), elige una categoría
2. Página baja automáticamente a productos filtrados
3. Solo muestra productos de esa categoría
4. Click en "Todos" para ver todos
```

### Login: Modal de Autenticación
```
1. Click en botón "Tu Cuenta" (arriba)
2. Ingresa email
3. Ingresa contraseña (dummy)
4. Click "Iniciar Sesión"
5. Ahora muestra OTP
6. Ingresa código (dummy)
7. Muestra QR de Google Authenticator
```

### Admin: Panel de Control
```
1. Abre http://localhost:3000/dashboard
2. Ve tabla de productos
3. Click en ícono "edit" para editar
4. Click en "trash" para eliminar
5. Click en "Nuevo Producto" para agregar
```

## 📱 Responsive Design

Probado en:
- ✅ Desktop (1440px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (375px-767px)

```bash
# Para probar responsive en Chrome DevTools
F12 -> Toggle Device Toolbar (Ctrl+Shift+M)
```

## 🔌 API Integration (Próximo)

El frontend ya tiene:
- ✅ Cliente HTTP (`lib/api.ts`)
- ✅ Config de endpoints (`lib/config.ts`)
- ✅ Hooks para estado (useCart, useProducts, useAuth)
- ⏳ Solo necesita conectar hooks a apiClient

Ejemplo cuando esté lista:
```typescript
const { user, login } = useAuth();

const handleLogin = async (email: string) => {
  const user = await login(email);
  // Usuario autenticado!
}
```

## 🐛 Troubleshooting

### Frontend no inicia
```bash
cd app
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Backend no conecta con BD
```bash
docker-compose down
docker-compose up -d
pnpm run typeorm migration:run
```

### Ports en uso
```bash
# Verificar qué usa el puerto
lsof -i :3000   # Frontend
lsof -i :3001   # Backend
lsof -i :5432   # PostgreSQL

# Matar proceso
kill -9 <PID>
```

## 📚 Documentación Completa

- **[README.md](./README.md)** - Descripción general del proyecto
- **[MIGRATION_COMPLETE.md](./app/MIGRATION_COMPLETE.md)** - Detalles de la migración App Router
- **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios

## ✅ Checklist Rápido

- [ ] Backend corriendo en :3001
- [ ] Frontend corriendo en :3000
- [ ] Página home carga con 50 productos
- [ ] Carrito agrega/elimina productos
- [ ] Categorías filtran correctamente
- [ ] Login modal abre
- [ ] Admin dashboard accesible
- [ ] No hay errores en consola

## 🎓 Próximos Pasos

1. **Conectar login real**
   - Actualizar `hooks/useAuth.ts`
   - Llamar a `POST /auth/login` del backend

2. **Cargar productos del servidor**
   - Crear `hooks/useProductsAPI.ts`
   - Llamar a `GET /products` del backend

3. **Crear órdenes**
   - Implementar checkout flow
   - `POST /orders` del backend

4. **Más componentes**
   - Extraer ProductCard
   - Extraer Header/Footer
   - Crear página de producto

## 💡 Tips

1. **Hot Reload funciona:** Edita archivo y actualiza automáticamente
2. **TypeScript strict:** Detecta errores antes de compilar
3. **CSS Global:** Editablilidades `app/globals.css`
4. **Productos dummy:** En `lib/data/products.ts`
5. **Mock API:** Actualmente devuelve datos locales

---

## 🆘 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| Compilación lenta | Espera a que termine build inicial |
| CSS no carga | Limpiar `.next` y reiniciar |
| API 404 | Verificar URL en `lib/config.ts` |
| Carrito vacío | localStorage limpio (normal en dev) |
| Componentes no ven | Usar `'use client'` para client components |

---

**Versión:** 1.0.0 (App Router Ready)
**Última actualización:** Noviembre 2024
**Tiempo de setup:** ~5 minutos
