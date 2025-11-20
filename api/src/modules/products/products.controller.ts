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
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Throttle({ default: { limit: 50, ttl: 60000 } })  // 50 creates per minute
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.tenantId, createProductDto);
  }

  @Get()
  @SkipThrottle()  // Allow frequent reads
  findAll(@Request() req) {
    return this.productsService.findAllByTenant(req.user.tenantId);
  }

  @Get('slug/:slug')
  @SkipThrottle()  // Allow frequent reads
  findBySlug(@Request() req, @Param('slug') slug: string) {
    return this.productsService.findBySlug(slug, req.user.tenantId);
  }

  @Get(':id')
  @SkipThrottle()  // Allow frequent reads
  findOne(@Request() req, @Param('id') id: string) {
    return this.productsService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  @Throttle({ default: { limit: 30, ttl: 60000 } })  // 30 updates per minute
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, req.user.tenantId, updateProductDto);
  }

  @Patch(':id/deactivate')
  @Throttle({ default: { limit: 20, ttl: 60000 } })  // 20 deactivations per minute
  deactivate(@Request() req, @Param('id') id: string) {
    return this.productsService.deactivate(id, req.user.tenantId);
  }

  @Delete(':id')
  @Throttle({ default: { limit: 20, ttl: 60000 } })  // 20 deletes per minute
  remove(@Request() req, @Param('id') id: string) {
    return this.productsService.remove(id, req.user.tenantId);
  }
}
