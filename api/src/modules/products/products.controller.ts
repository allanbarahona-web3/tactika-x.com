import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.tenantId, createProductDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.productsService.findAllByTenant(req.user.tenantId);
  }

  @Get('slug/:slug')
  findBySlug(@Request() req, @Param('slug') slug: string) {
    return this.productsService.findBySlug(slug, req.user.tenantId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.productsService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, req.user.tenantId, updateProductDto);
  }

  @Patch(':id/deactivate')
  deactivate(@Request() req, @Param('id') id: string) {
    return this.productsService.deactivate(id, req.user.tenantId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.productsService.remove(id, req.user.tenantId);
  }
}
