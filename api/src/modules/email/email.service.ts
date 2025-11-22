/**
 * EMAIL SERVICE - Multi-tenant SMTP Support
 * 
 * Envía emails dinámicamente usando configuración SMTP de cada tenant
 * Soporta SMTP estándar, SendGrid, Mailgun, AWS SES
 */

import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';
import { CryptoService } from '../../common/services/crypto.service';

export interface EmailOptions {
  tenantId: number;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: any[];
}

export interface EmailTemplate {
  templateName: string;
  variables: Record<string, any>;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporters: Map<number, nodemailer.Transporter> = new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Envía un email usando configuración SMTP del tenant
   */
  async sendEmail(options: EmailOptions): Promise<{ messageId: string; success: boolean }> {
    try {
      // 1. Obtener configuración SMTP del tenant
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: options.tenantId },
        select: { config: true, name: true },
      });

      if (!tenant) {
        throw new BadRequestException(`Tenant ${options.tenantId} not found`);
      }

      // 2. Validar que existe configuración de email
      const currentConfig = (tenant.config as Record<string, any>) || {};
      const emailConfig = currentConfig.email;
      if (!emailConfig || !emailConfig.isActive) {
        throw new BadRequestException(
          `Email not configured for tenant ${options.tenantId}`,
        );
      }

      // 3. Obtener o crear transporter
      const transporter = await this.getOrCreateTransporter(options.tenantId, emailConfig);

      // 4. Preparar opciones de email
      const mailOptions = {
        from: `${emailConfig.fromName} <${emailConfig.fromAddress}>`,
        to: Array.isArray(options.to) ? options.to.join(',') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo || emailConfig.replyToAddress,
      };

      // 5. Enviar email
      this.logger.log(`Sending email to ${options.to} for tenant ${options.tenantId}`);
      const info = await transporter.sendMail(mailOptions);

      this.logger.log(`Email sent successfully. MessageId: ${info.messageId}`);
      return {
        messageId: info.messageId,
        success: true,
      };
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Envía email basado en template
   */
  async sendEmailFromTemplate(
    options: Omit<EmailOptions, 'html' | 'text'>,
    template: EmailTemplate,
  ): Promise<{ messageId: string; success: boolean }> {
    // TODO: Implementar carga y renderizado de templates
    // Por ahora, retornar error
    throw new BadRequestException('Template emails not yet implemented');
  }

  /**
   * Obtiene o crea transporter para el tenant
   * Cachea transporters en memoria para evitar recrearlos
   */
  private async getOrCreateTransporter(
    tenantId: number,
    emailConfig: any,
  ): Promise<nodemailer.Transporter> {
    // Si ya existe en cache, devolverlo
    if (this.transporters.has(tenantId)) {
      return this.transporters.get(tenantId);
    }

    let transporter: nodemailer.Transporter;

    switch (emailConfig.provider) {
      case 'smtp':
        transporter = await this.createSmtpTransporter(emailConfig);
        break;

      case 'sendgrid':
        transporter = await this.createSendGridTransporter(emailConfig);
        break;

      case 'mailgun':
        transporter = await this.createMailgunTransporter(emailConfig);
        break;

      case 'aws-ses':
        transporter = await this.createAwsSesTransporter(emailConfig);
        break;

      default:
        throw new BadRequestException(
          `Email provider ${emailConfig.provider} not supported`,
        );
    }

    // Cachear
    this.transporters.set(tenantId, transporter);

    // Limpiar cache después de 24 horas
    setTimeout(() => {
      this.transporters.delete(tenantId);
    }, 24 * 60 * 60 * 1000);

    return transporter;
  }

  /**
   * Crea transporter SMTP estándar
   */
  private async createSmtpTransporter(config: any): Promise<nodemailer.Transporter> {
    if (!config.host || !config.port) {
      throw new BadRequestException('SMTP host and port required');
    }

    // Desencriptar password si está encriptado
    const secret = this.configService.get<string>('JWT_SECRET');
    const password = config.auth?.pass.startsWith('encrypted:')
      ? await this.cryptoService.decrypt(config.auth.pass.replace('encrypted:', ''), secret)
      : config.auth?.pass;

    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure || false,
      auth: {
        user: config.auth?.user,
        pass: password,
      },
    });
  }

  /**
   * Crea transporter SendGrid
   */
  private async createSendGridTransporter(config: any): Promise<nodemailer.Transporter> {
    if (!config.apiKey) {
      throw new BadRequestException('SendGrid API key required');
    }

    const secret = this.configService.get<string>('JWT_SECRET');
    const apiKey = config.apiKey.startsWith('encrypted:')
      ? await this.cryptoService.decrypt(config.apiKey.replace('encrypted:', ''), secret)
      : config.apiKey;

    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: apiKey,
      },
    });
  }

  /**
   * Crea transporter Mailgun
   */
  private async createMailgunTransporter(config: any): Promise<nodemailer.Transporter> {
    if (!config.apiKey || !config.domain) {
      throw new BadRequestException('Mailgun API key and domain required');
    }

    const secret = this.configService.get<string>('JWT_SECRET');
    const apiKey = config.apiKey.startsWith('encrypted:')
      ? await this.cryptoService.decrypt(config.apiKey.replace('encrypted:', ''), secret)
      : config.apiKey;

    return nodemailer.createTransport({
      host: `smtp.mailgun.org`,
      port: 587,
      secure: false,
      auth: {
        user: `postmaster@${config.domain}`,
        pass: apiKey,
      },
    });
  }

  /**
   * Crea transporter AWS SES
   * Requiere AWS SDK v3
   */
  private async createAwsSesTransporter(config: any): Promise<nodemailer.Transporter> {
    // TODO: Implementar AWS SES
    throw new BadRequestException('AWS SES not yet implemented');
  }

  /**
   * Verifica que la configuración SMTP es válida
   */
  async verifySMTPConfig(tenantId: number): Promise<boolean> {
    try {
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { config: true },
      });

      const currentConfig = (tenant?.config as Record<string, any>) || {};
      if (!currentConfig.email) {
        return false;
      }

      const transporter = await this.getOrCreateTransporter(tenantId, currentConfig.email);
      await transporter.verify();

      this.logger.log(`SMTP config verified for tenant ${tenantId}`);
      return true;
    } catch (error) {
      this.logger.error(`SMTP verification failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Limpia cache de transporters
   */
  clearTransporterCache(tenantId?: number): void {
    if (tenantId) {
      this.transporters.delete(tenantId);
    } else {
      this.transporters.clear();
    }
  }
}
