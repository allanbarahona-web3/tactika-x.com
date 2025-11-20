import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * MIDDLEWARE - TENANT DETECTION
 * Detecta el dominio y setea el tenant en los headers para usar en toda la app
 */

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || 'localhost:3000';
  
  // Log para debugging
  console.log('🌐 Middleware - Hostname:', hostname);

  // Clonar headers y agregar tenant info
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hostname', hostname);
  
  // TODO: Aquí podrías hacer un fetch al backend para resolver el tenant
  // Por ahora usamos mapeo simple
  let tenantId = 'tenant-1'; // Default: TACTIKA-X
  
  if (hostname.includes('farmacia')) {
    tenantId = 'tenant-2';
  } else if (hostname.includes('zapateria')) {
    tenantId = 'tenant-3';
  }
  
  requestHeaders.set('x-tenant-id', tenantId);
  
  // Continuar con la request
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configuración: aplicar middleware a todas las rutas excepto archivos estáticos
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
