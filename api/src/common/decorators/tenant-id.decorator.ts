import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador para obtener el tenantId del usuario autenticado
 * Uso: @TenantId() tenantId: number
 */
export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    // Convertir string a number si es necesario (desde JWT viene como string)
    const tenantId = request.user?.tenantId;
    return typeof tenantId === 'string' ? parseInt(tenantId, 10) : tenantId;
  },
);
