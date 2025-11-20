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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Throttle({ default: { limit: 25, ttl: 60000 } })  // 25 payments per minute
  create(@Request() req, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(req.user.tenantId, createPaymentDto);
  }

  @Get()
  @SkipThrottle()  // Allow frequent reads
  findAll(@Request() req) {
    return this.paymentsService.findAllByTenant(req.user.tenantId);
  }

  @Get('order/:orderId')
  @SkipThrottle()  // Allow frequent reads
  findByOrder(@Request() req, @Param('orderId') orderId: string) {
    return this.paymentsService.findAllByOrder(orderId, req.user.tenantId);
  }

  @Get(':id')
  @SkipThrottle()  // Allow frequent reads
  findOne(@Request() req, @Param('id') id: string) {
    return this.paymentsService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  @Throttle({ default: { limit: 20, ttl: 60000 } })  // 20 updates per minute
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(id, req.user.tenantId, updatePaymentDto);
  }

  @Patch(':id/mark-paid')
  @Throttle({ default: { limit: 15, ttl: 60000 } })  // 15 marks-paid per minute
  markAsPaid(@Request() req, @Param('id') id: string, @Body('providerPaymentId') providerPaymentId?: string) {
    return this.paymentsService.markAsPaid(id, req.user.tenantId, providerPaymentId);
  }

  @Patch(':id/mark-failed')
  @Throttle({ default: { limit: 15, ttl: 60000 } })  // 15 marks-failed per minute
  markAsFailed(@Request() req, @Param('id') id: string) {
    return this.paymentsService.markAsFailed(id, req.user.tenantId);
  }
}
