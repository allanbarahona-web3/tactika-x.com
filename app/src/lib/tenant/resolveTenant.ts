/**
 * TENANT RESOLVER
 * Determina qué tenant corresponde a cada dominio
 */

export interface TenantInfo {
  id: string;
  name: string;
  domain: string;
  theme: 'armas' | 'farmacia' | 'zapateria' | 'barmentech' | 'store';
  config: {
    apiUrl: string;
    logoUrl?: string;
    customCss?: string;
  };
}

/**
 * Llama al backend para obtener información del tenant basado en el dominio
 * En producción esto llamaría a: GET /public/tenants/by-domain?domain=xxx.com
 */
export async function resolveTenantFromDomain(hostname: string): Promise<TenantInfo | null> {
  try {
    // TODO: Reemplazar con llamada real al backend
    // const response = await fetch(`${API_BASE_URL}/public/tenants/by-domain?domain=${hostname}`);
    // const data = await response.json();
    // return data;

    // Mapeo de dominios a tenants
    const tenantMap: Record<string, TenantInfo> = {
      // DESARROLLO
      'localhost:3000': {
        id: 'tenant-1',
        name: 'TACTIKA-X',
        domain: 'localhost:3000',
        theme: 'armas',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      'commerce.localhost:3000': {
        id: 'tenant-0',
        name: 'Barmentech Commerce',
        domain: 'commerce.localhost:3000',
        theme: 'barmentech',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      
      // PRODUCCIÓN - TACTIKA-X
      'tactika-x.com': {
        id: 'tenant-1',
        name: 'TACTIKA-X',
        domain: 'tactika-x.com',
        theme: 'armas',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      'tactika-x-app.vercel.app': {
        id: 'tenant-1',
        name: 'TACTIKA-X',
        domain: 'tactika-x-app.vercel.app',
        theme: 'armas',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      
      // PRODUCCIÓN - BARMENTECH COMMERCE
      'commerce.barmentech.com': {
        id: 'tenant-0',
        name: 'Barmentech Commerce',
        domain: 'commerce.barmentech.com',
        theme: 'barmentech',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      'barmentech-saas.vercel.app': {
        id: 'tenant-0',
        name: 'Barmentech Commerce',
        domain: 'barmentech-saas.vercel.app',
        theme: 'barmentech',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      
      // PRODUCCIÓN - STORE TECH
      'store.barmentech.com': {
        id: 'tenant-2',
        name: 'TechStore',
        domain: 'store.barmentech.com',
        theme: 'store',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
    };

    // Buscar por hostname exacto
    let tenant = tenantMap[hostname];
    if (tenant) return tenant;

    // Buscar por patrón si no encuentra exacto
    if (hostname.includes('commerce.barmentech.com') || hostname.includes('barmentech-saas.vercel.app')) {
      tenant = tenantMap['commerce.barmentech.com'];
      if (tenant) return tenant;
    }
    if (hostname.includes('store.barmentech.com')) {
      tenant = tenantMap['store.barmentech.com'];
      if (tenant) return tenant;
    }
    if (hostname.includes('tactika-x.com') || hostname.includes('tactika-x-app.vercel.app')) {
      tenant = tenantMap['tactika-x.com'];
      if (tenant) return tenant;
    }

    // Default: TACTIKA-X
    return tenantMap['localhost:3000'];
  } catch (error) {
    console.error('Error resolving tenant:', error);
    return null;
  }
}

/**
 * Obtiene el tenant desde los headers de la request (seteado por middleware)
 */
export function getTenantFromHeaders(headers: Headers): string | null {
  return headers.get('x-tenant-id');
}
