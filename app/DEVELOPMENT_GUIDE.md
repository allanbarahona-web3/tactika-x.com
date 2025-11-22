# Admin Panel - Guía de Desarrollo

## Arquitectura

### Context API Pattern
El admin panel usa React Context para gestionar el estado de autenticación globalmente.

```tsx
// Uso en componentes
const { user, token, isAuthenticated, login, logout } = useAuth();
```

### API Client Layers

```
UI Components
     ↓
API Hooks/Calls
     ↓
API Client (client.ts)
     ↓
Backend API
```

El cliente API centraliza todas las llamadas al backend y maneja:
- Autenticación (Bearer token)
- Errores
- Serialización JSON
- Tipado TypeScript

### Estructura de Formularios

Todos los formularios usan el patrón:
1. Estado local del formulario
2. Handler onChange para inputs
3. Handler onSubmit con validación
4. Llamada a API
5. Re-fetch de datos
6. Reset de estado

```tsx
const [formData, setFormData] = useState({ /* initial */ });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    editingId 
      ? await api.update(token, editingId, formData)
      : await api.create(token, formData);
    fetchData(); // Refresh list
  } catch (err) {
    setError(err.message);
  }
};
```

## Convenciones de Código

### Archivos y Carpetas
- Componentes: `PascalCase` (page.tsx)
- Funciones utilitarias: `camelCase` (client.ts)
- Contextos: `PascalCase` (AuthContext.tsx)

### Naming
- API functions: `api.list()`, `api.create()`, `api.update()`, `api.delete()`
- Handlers: `handle[Action]` (handleSubmit, handleDelete)
- State setters: `set[State]` (setLoading, setError)
- Booleanos: `is[State]` (isLoading, isAuthenticated)

### Estilos
- Tailwind CSS only (no CSS files)
- Colores consistentes:
  - Primary: blue-600
  - Success: green-500
  - Error: red-600
  - Warning: yellow-500
  - Neutral: gray-*

## Agregar Nuevas Páginas

### 1. Crear página
```tsx
// app/admin/new-feature/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { newFeatureApi } from '@/lib/api/client';

export default function NewFeaturePage() {
  const { token } = useAuth();
  // Implementar...
}
```

### 2. Agregar a API client
```tsx
// lib/api/client.ts
export const newFeatureApi = {
  list: (token: string) =>
    ApiClient.request<any>('/new-feature', { token }),
  
  create: (token: string, data: any) =>
    ApiClient.request<any>('/new-feature', {
      token,
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
```

### 3. Agregar a navegación
```tsx
// app/admin/layout.tsx
const navigation = [
  // ... existing items
  { name: 'New Feature', href: '/admin/new-feature', icon: '✨' },
];
```

## Patrones Comunes

### Fetch con useEffect
```tsx
useEffect(() => {
  if (!token) return;
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await api.list(token);
      setData(data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, [token]);
```

### Modal Dialog
```tsx
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
      {/* Contenido */}
    </div>
  </div>
)}
```

### Status Badge
```tsx
<span className={`px-3 py-1 rounded-full text-xs font-medium ${
  status === 'active' 
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
}`}>
  {status}
</span>
```

### Error Alert
```tsx
{error && (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
    {error}
  </div>
)}
```

### Loading State
```tsx
{loading ? (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
) : (
  /* Contenido */
)}
```

## Mejores Prácticas

### 1. Seguridad
- Nunca expongas tokens en URLs o localStorage sin protección
- Usa HTTPS en producción
- Valida datos en backend (no confíes en cliente)
- Sanitiza inputs para prevenir XSS

### 2. Performance
- Usa modales en lugar de navegar entre pages para CRUD simple
- Implementa lazy loading para listas grandes
- Cachea datos cuando sea apropiado
- Evita re-renders innecesarios

### 3. UX
- Muestra loading states
- Proporciona feedback visual de errores
- Usa confirmaciones para destructive actions
- Redirecciona después de crear/editar
- Muestra empty states informativos

### 4. Testing
```tsx
// Ejemplo de test
describe('ProductsPage', () => {
  it('should display products list', async () => {
    render(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText('Products')).toBeInTheDocument();
    });
  });
});
```

## Debugging

### Chrome DevTools
1. **Network**: Inspecciona requests/responses al API
2. **Application**: Verifica localStorage para tokens
3. **Console**: Revisa errores de JavaScript

### Logs Útiles
```tsx
// Debug de estado
console.log('User:', user);
console.log('Token:', token);
console.log('Form data:', formData);
console.log('API Response:', data);
```

### Errores Comunes

#### "Cannot find module"
```
Solución: Verifica tsconfig.json paths
```

#### "Token undefined"
```
Solución: Asegúrate que AuthProvider envuelve el componente
```

#### "CORS error"
```
Solución: Configura CORS en backend (NestJS)
```

#### "401 Unauthorized"
```
Solución: Token expirado o inválido, re-login
```

## Flujo de Desarrollo Típico

1. **Diseño**: Sketch del UI en papel/Figma
2. **Backend**: Crear endpoints API
3. **Frontend**: 
   - Crear página
   - Agregar API client
   - Implementar UI
   - Conectar a API
   - Probar en dev
4. **Testing**: Validar flujos
5. **Deploy**: Commit y push

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Preguntas Frecuentes

**P: ¿Cómo agregar validación de formularios?**
A: Usa librerías como React Hook Form o Zod para tipado y validación.

**P: ¿Cómo manejar paginación?**
A: Backend retorna `data`, `total`, `page`, `limit` - implementa en frontend.

**P: ¿Cómo agregar search/filtros?**
A: Agrega parámetros query al endpoint API y renderiza inputs con onChange handlers.

**P: ¿Cómo manejar uploads de archivos grandes?**
A: Implementa progress tracking, chunked uploads o usa librerías como Dropzone.

---

**Última actualización**: 2024
