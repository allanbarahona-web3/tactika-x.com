import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * MIDDLEWARE - TENANT DETECTION
 * Detecta el dominio y setea el tenant en los headers para usar en toda la app
 */

export function middleware(request: NextRequest) {
  try {
    const hostname = request.headers.get('host') || 'localhost:3000';
    
    console.log('🌐 Middleware - Hostname:', hostname);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-hostname', hostname);
    
    // Mapeo de dominios a tenants
    let tenantId = 'tactika-x'; // Default: Tactika-X
    
    if (hostname.includes('commerce.barmentech.com') || hostname.includes('barmentech-saas.vercel.app')) {
      tenantId = 'barmentech';
    } else if (hostname.includes('store.barmentech.com')) {
      tenantId = 'store';
    } else if (hostname.includes('tactika-x.com') || hostname.includes('tactika-x-app.vercel.app')) {
      tenantId = 'tactika-x';
    }
    
    requestHeaders.set('x-tenant-id', tenantId);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('❌ Middleware Error:', error);
    // En caso de error, retornar respuesta segura
    return NextResponse.next();
  }
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
