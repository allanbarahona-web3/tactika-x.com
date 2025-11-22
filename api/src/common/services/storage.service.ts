import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Storage Service
 * Servicio genérico para construir URLs y paths de imágenes
 * Funciona tanto con DO Spaces directo como con CDN de Cloudflare
 */
@Injectable()
export class StorageService {
  constructor(private configService: ConfigService) {}

  /**
   * Construye la URL completa de la imagen según ambiente
   * En desarrollo: DO Spaces directo
   * En producción: A través de Cloudflare CDN
   */
  getImageUrl(path: string): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    
    if (nodeEnv === 'production') {
      const cdnUrl = this.configService.get<string>('CDN_URL');
      return `${cdnUrl}/${path}`;
    }
    
    // Desarrollo: usar DO Spaces directo
    const doSpacesUrl = this.configService.get<string>('DO_SPACES_URL');
    return `${doSpacesUrl}/${path}`;
  }

  /**
   * Genera el path relativo para guardar en BD
   * Formato: tenants/{tenantId}/{entityType}/{filename}
   */
  generateMediaPath(
    tenantId: number,
    entityType: string,
    fileName: string,
  ): string {
    return `tenants/${tenantId}/${entityType}/${fileName}`;
  }

  /**
   * Genera el S3 key (mismo que path relativo)
   * Este es el path que se usa en DO Spaces
   */
  generateS3Key(
    tenantId: number,
    entityType: string,
    fileName: string,
  ): string {
    return this.generateMediaPath(tenantId, entityType, fileName);
  }

  /**
   * Genera un nombre de archivo único
   */
  generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    const nameWithoutExt = originalName.replace(`.${extension}`, '');
    const sanitizedName = nameWithoutExt.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    
    return `${timestamp}-${random}-${sanitizedName}.${extension}`;
  }
}
