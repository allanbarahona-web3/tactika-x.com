import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { TokenService } from '../../../common/services/token.service';

/**
 * JWT Auth Guard with JTI (JWT ID) Revocation Check
 * 
 * Verifica que:
 * 1. El token JWT sea válido y no esté expirado (via passport-jwt)
 * 2. El JTI del token no haya sido revocado (via TokenService)
 * 
 * ACID: Las verificaciones se hacen sobre la tabla auth_sessions en PostgreSQL
 * RLS: Cada tenant solo puede ver sus propias sesiones
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private tokenService: TokenService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Primero validar que el JWT sea válido
    const isValid = await super.canActivate(context);
    if (!isValid) {
      return false;
    }

    // Luego verificar que el JTI no haya sido revocado
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.jti) {
      throw new UnauthorizedException('Invalid token: missing JTI');
    }

    // Verificar si el token está revocado
    const isRevoked = await this.tokenService.isTokenRevoked(user.jti);
    if (isRevoked) {
      throw new UnauthorizedException('Token has been revoked');
    }

    return true;
  }
}
