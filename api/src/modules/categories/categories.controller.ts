import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

/**
 * Categories Controller
 * Endpoints para gestión de categorías de productos
 * Requiere autenticación (agregar guards después)
 */
@Controller('admin/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Crear categoría
   * POST /admin/categories
   */
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  /**
   * Listar todas las categorías de un tenant
   * GET /admin/categories?tenantId=1
   */
  @Get()
  async findByTenant(@Query('tenantId') tenantId: string) {
    return this.categoriesService.findByTenant(parseInt(tenantId));
  }

  /**
   * Listar solo categorías activas (para storefront)
   * GET /admin/categories/active?tenantId=1
   */
  @Get('active')
  async findActiveCategoriesByTenant(@Query('tenantId') tenantId: string) {
    return this.categoriesService.findActiveCategoriesByTenant(parseInt(tenantId));
  }

  /**
   * Obtener una categoría por ID
   * GET /admin/categories/:id?tenantId=1
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Query('tenantId') tenantId: string) {
    return this.categoriesService.findOne(id, parseInt(tenantId));
  }

  /**
   * Actualizar categoría
   * PATCH /admin/categories/:id?tenantId=1
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, parseInt(tenantId), updateCategoryDto);
  }

  /**
   * Eliminar categoría
   * DELETE /admin/categories/:id?tenantId=1
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @Query('tenantId') tenantId: string) {
    return this.categoriesService.remove(id, parseInt(tenantId));
  }
}
