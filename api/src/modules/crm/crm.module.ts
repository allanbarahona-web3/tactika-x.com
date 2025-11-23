/**
 * CRM Module
 * Modulo multi-canal para gestionar conversaciones con clientes
 * Soporta: WhatsApp, Instagram, Facebook, Telegram, TikTok, SMS, Email
 */

import { Module } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ChannelDriverFactory } from './factory/channel-driver.factory';

@Module({
  imports: [PrismaModule],
  controllers: [CrmController],
  providers: [CrmService, ChannelDriverFactory],
  exports: [CrmService, ChannelDriverFactory],
})
export class CrmModule {}
