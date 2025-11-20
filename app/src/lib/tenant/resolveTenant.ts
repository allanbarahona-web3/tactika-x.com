/**
 * TENANT RESOLVER
 * Determina qué tenant corresponde a cada dominio
 */

export interface TenantInfo {
  id: string;
  name: string;
  domain: string;
  theme: 'armas' | 'farmacia' | 'zapateria';
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

    // Mock temporal - mapeo hardcoded
    const tenantMap: Record<string, TenantInfo> = {
      'localhost:3000': {
        id: 'tenant-1',
        name: 'TACTIKA-X',
        domain: 'localhost:3000',
        theme: 'armas',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      'tactika-x.vercel.app': {
        id: 'tenant-1',
        name: 'TACTIKA-X',
        domain: 'tactika-x.vercel.app',
        theme: 'armas',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
      'farmacia.ejemplo.com': {
        id: 'tenant-2',
        name: 'Farmacia Salud',
        domain: 'farmacia.ejemplo.com',
        theme: 'farmacia',
        config: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
        },
      },
    };

    // Buscar por hostname exacto
    const tenant = tenantMap[hostname];
    if (tenant) return tenant;

    // Si no encuentra, usar default (TACTIKA-X)
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
