import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Throttle({ default: { limit: 30, ttl: 60000 } })  // 30 orders per minute
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.tenantId, createOrderDto);
  }

  @Get()
  @SkipThrottle()  // Allow frequent reads
  findAll(@Request() req) {
    return this.ordersService.findAllByTenant(req.user.tenantId);
  }

  @Get(':id')
  @SkipThrottle()  // Allow frequent reads
  findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  @Throttle({ default: { limit: 20, ttl: 60000 } })  // 20 updates per minute
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, req.user.tenantId, updateOrderDto);
  }

  @Patch(':id/cancel')
  @Throttle({ default: { limit: 15, ttl: 60000 } })  // 15 cancels per minute
  cancel(@Request() req, @Param('id') id: string) {
    return this.ordersService.cancel(id, req.user.tenantId);
  }
}
