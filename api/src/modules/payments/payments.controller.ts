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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Request() req, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(req.user.tenantId, createPaymentDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.paymentsService.findAllByTenant(req.user.tenantId);
  }

  @Get('order/:orderId')
  findByOrder(@Request() req, @Param('orderId') orderId: string) {
    return this.paymentsService.findAllByOrder(orderId, req.user.tenantId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.paymentsService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(id, req.user.tenantId, updatePaymentDto);
  }

  @Patch(':id/mark-paid')
  markAsPaid(@Request() req, @Param('id') id: string, @Body('providerPaymentId') providerPaymentId?: string) {
    return this.paymentsService.markAsPaid(id, req.user.tenantId, providerPaymentId);
  }

  @Patch(':id/mark-failed')
  markAsFailed(@Request() req, @Param('id') id: string) {
    return this.paymentsService.markAsFailed(id, req.user.tenantId);
  }
}
