import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenService } from '../../common/services/token.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export interface JwtPayload {
  sub: string; // userId
  tenantId: number; // Integer ID del tenant (no convertir a string)
  role: string;
  jti: string; // JWT ID para revocación
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { tenantId, email, password, name, role } = registerDto;

    // Verificar si el usuario ya existe
    const existing = await this.prisma.tenantUser.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email,
        },
      },
    });

    if (existing) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash del password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await this.prisma.tenantUser.create({
      data: {
        tenantId,
        email,
        passwordHash,
        name,
        role: role || 'staff',
      },
    });

    // Retornar sin el password
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto, ipAddress?: string, userAgent?: string) {
    const { email, password, tenantId } = loginDto;

    console.log('🔐 LOGIN ATTEMPT:', { email, tenantId, ipAddress });

    // Buscar usuario
    const user = await this.prisma.tenantUser.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email,
        },
      },
    });

    console.log('👤 USER FOUND:', user ? `${user.email} (${user.role})` : 'NOT FOUND');

    if (!user) {
      console.log('❌ Invalid credentials - user not found');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificar password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    console.log('🔑 PASSWORD VALID:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid credentials - password mismatch');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificar que el usuario esté activo
    if (user.status !== 'active') {
      console.log('❌ User not active, status:', user.status);
      throw new UnauthorizedException('User is not active');
    }

    // Generar tokens
    const { accessToken, refreshToken } = await this.generateTokens(user, ipAddress, userAgent);

    console.log('✅ LOGIN SUCCESSFUL:', { userId: user.id, email: user.email });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
      },
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      // Verificar refresh token
      const payload = this.jwtService.verify(refreshToken);

      // Buscar sesión en la base de datos
      const session = await this.tokenService.getSessionByRefreshToken(refreshToken);
      
      if (!session || session.isRevoked) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (new Date() > session.expiresAt) {
        throw new UnauthorizedException('Refresh token expired');
      }

      // Buscar usuario
      const user = await this.prisma.tenantUser.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.status !== 'active') {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Verificar que el tokenVersion no haya cambiado (para revocar sesiones)
      if (user.tokenVersion !== payload.tokenVersion) {
        throw new UnauthorizedException('Token has been revoked');
      }

      // Generar nuevo access token
      const jti = randomUUID();
      const newPayload: JwtPayload = {
        sub: user.id,
        tenantId: user.tenantId,
        role: user.role,
        jti,
      };

      const accessToken = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
      });

      // Actualizar el JTI del access token en la sesión
      await this.tokenService.updateAccessTokenJti(refreshToken, jti);

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken: string) {
    // Revocar la sesión específica
    await this.tokenService.revokeSessionByRefreshToken(refreshToken);

    return { message: 'Logged out successfully' };
  }

  async revokeAllUserTokens(userId: string) {
    // Incrementar tokenVersion para invalidar todos los tokens
    await this.prisma.tenantUser.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });

    // Revocar todas las sesiones en la base de datos
    await this.tokenService.revokeAllUserTokens(userId);

    return { message: 'All tokens revoked successfully' };
  }

  private async generateTokens(user: any, ipAddress?: string, userAgent?: string) {
    const jti = randomUUID();
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: user.tenantId,
      role: user.role,
      jti,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshPayload = { ...payload, tokenVersion: user.tokenVersion };
    const refreshToken = this.jwtService.sign(refreshPayload, { 
      expiresIn: '7d' 
    });

    // Crear sesión en la base de datos (ACID)
    await this.tokenService.createSession(
      jti,
      user.id,
      user.tenantId,
      refreshToken,
      604800, // 7 días en segundos
      ipAddress,
      userAgent,
    );

    return { accessToken, refreshToken };
  }

  async validateUser(payload: JwtPayload) {
    // Verificar si el token fue revocado (ahora es async)
    const isRevoked = await this.tokenService.isTokenRevoked(payload.jti);
    if (isRevoked) {
      throw new UnauthorizedException('Token has been revoked');
    }

    const user = await this.prisma.tenantUser.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }
}
