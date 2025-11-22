import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { UpdateMediaDto } from './dto/update-media.dto';

/**
 * Media Controller
 * Endpoints para gestión de imágenes
 * Requiere autenticación (agregar guards después)
 */
@Controller('admin/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  /**
   * Upload de imagen
   * POST /admin/media/upload
   * Body: file (multipart/form-data)
   * Query: entityType, entityId, tenantId, alt
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Query('entityType') entityType: string,
    @Query('entityId') entityId: string,
    @Query('tenantId') tenantId: string,
    @Query('alt') alt?: string,
  ) {
    return this.mediaService.uploadMedia(
      file,
      parseInt(tenantId),
      entityType,
      entityId,
      alt,
    );
  }

  /**
   * Listar todas las imágenes de un tenant
   * GET /admin/media?tenantId=1
   */
  @Get()
  async findByTenant(@Query('tenantId') tenantId: string) {
    return this.mediaService.findByTenant(parseInt(tenantId));
  }

  /**
   * Listar imágenes de una entidad específica
   * GET /admin/media/entity?tenantId=1&entityType=category&entityId=cat-123
   */
  @Get('entity')
  async findByEntity(
    @Query('tenantId') tenantId: string,
    @Query('entityType') entityType: string,
    @Query('entityId') entityId: string,
  ) {
    return this.mediaService.findByEntity(
      parseInt(tenantId),
      entityType,
      entityId,
    );
  }

  /**
   * Obtener una imagen por ID
   * GET /admin/media/:id?tenantId=1
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Query('tenantId') tenantId: string) {
    return this.mediaService.findOne(id, parseInt(tenantId));
  }

  /**
   * Actualizar metadata de imagen (alt, order, etc)
   * PATCH /admin/media/:id?tenantId=1
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return this.mediaService.update(id, parseInt(tenantId), updateMediaDto);
  }

  /**
   * Eliminar imagen
   * DELETE /admin/media/:id?tenantId=1
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @Query('tenantId') tenantId: string) {
    return this.mediaService.remove(id, parseInt(tenantId));
  }
}
