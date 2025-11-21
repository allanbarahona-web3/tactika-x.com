# 📧 EJEMPLOS DE INTEGRACIÓN - SMTP POR TENANT

## 🎯 Guía Rápida: Cómo Integrar EmailService en Tus Módulos

---

## 1️⃣ ÓRDENES - Confirmación de Compra

### **Escenario:** Cliente compra → Recibe email de confirmación

```typescript
// src/modules/orders/orders.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, tenantId: number) {
    // 1. Validar cliente
    const customer = await this.prisma.customer.findUnique({
      where: {
        id_tenantId: { id: createOrderDto.customerId, tenantId },
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // 2. Crear orden
    const order = await this.prisma.order.create({
      data: {
        tenantId,
        orderNumber: `ORD-${Date.now()}`,
        customerId: customer.id,
        subtotalAmount: createOrderDto.subtotalAmount,
        totalAmount: createOrderDto.totalAmount,
        status: 'pending',
      },
      include: { items: true },
    });

    // 3. Enviar email de confirmación (NO BLOQUEAR)
    this.sendOrderConfirmationEmail(order, customer, tenantId).catch((err) => {
      console.error(`Failed to send order email: ${err.message}`);
      // NO LANZAR ERROR - la orden se creó correctamente
    });

    return order;
  }

  // Método separado para envío async
  private async sendOrderConfirmationEmail(order: any, customer: any, tenantId: number) {
    const itemsHtml = order.items
      .map((item) => `<tr>
        <td>${item.productId}</td>
        <td>${item.quantity}</td>
        <td>$${(item.unitPrice / 100).toFixed(2)}</td>
        <td>$${(item.totalPrice / 100).toFixed(2)}</td>
      </tr>`)
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif;">
          <h1>Order Confirmed! 🎉</h1>
          
          <p>Hi ${customer.name},</p>
          <p>Thank you for your order! We're processing it now.</p>
          
          <h3>Order Details</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <tr style="background: #f0f0f0;">
              <th style="border: 1px solid #ccc; padding: 10px;">Product</th>
              <th style="border: 1px solid #ccc; padding: 10px;">Qty</th>
              <th style="border: 1px solid #ccc; padding: 10px;">Unit Price</th>
              <th style="border: 1px solid #ccc; padding: 10px;">Total</th>
            </tr>
            ${itemsHtml}
            <tr>
              <td colspan="3" style="text-align: right; padding: 10px; font-weight: bold;">Total Amount:</td>
              <td style="padding: 10px; font-weight: bold;">$${(order.totalAmount / 100).toFixed(2)}</td>
            </tr>
          </table>
          
          <h3>What's Next?</h3>
          <ol>
            <li>We'll process your payment</li>
            <li>We'll ship your order</li>
            <li>You'll receive tracking info via email</li>
          </ol>
          
          <p>Questions? Reply to this email or contact support@store.com</p>
          
          <p>Best regards,<br/>Our Team</p>
        </body>
      </html>
    `;

    await this.emailService.sendEmail({
      tenantId,
      to: customer.email,
      subject: `Order #${order.orderNumber} Confirmed`,
      html,
    });
  }

  // Cuando orden se envía
  async updateOrderStatus(orderId: string, newStatus: string, tenantId: number) {
    const order = await this.prisma.order.update({
      where: { id_tenantId: { id: orderId, tenantId } },
      data: { status: newStatus },
      include: { customer: true },
    });

    // Enviar emails según estado
    if (newStatus === 'shipped') {
      await this.emailService.sendEmail({
        tenantId,
        to: order.customer.email,
        subject: `Order #${order.orderNumber} is on the way! 📦`,
        html: `
          <h2>Your order is on the way!</h2>
          <p>We've shipped your order. Track it with: ${order.id}</p>
        `,
      });
    } else if (newStatus === 'delivered') {
      await this.emailService.sendEmail({
        tenantId,
        to: order.customer.email,
        subject: `Order #${order.orderNumber} Delivered! ✅`,
        html: `
          <h2>Your order has been delivered!</h2>
          <p>We hope you love your purchase!</p>
        `,
      });
    }

    return order;
  }
}
```

---

## 2️⃣ PAGOS - Confirmación de Pago

### **Escenario:** Pago procesado → Cliente recibe recibo

```typescript
// src/modules/payments/payments.service.ts

import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async processPayment(paymentDto: any, tenantId: number) {
    // 1. Procesar pago (Stripe, PayPal, etc)
    const stripeResponse = await this.stripe.paymentIntents.create({
      amount: paymentDto.amount,
      currency: 'usd',
    });

    // 2. Guardar pago en BD
    const payment = await this.prisma.payment.create({
      data: {
        tenantId,
        orderId: paymentDto.orderId,
        amount: paymentDto.amount,
        status: stripeResponse.status === 'succeeded' ? 'paid' : 'failed',
        provider: 'stripe',
        providerPaymentId: stripeResponse.id,
      },
      include: { order: { include: { customer: true } } },
    });

    // 3. Enviar email según resultado
    if (payment.status === 'paid') {
      await this.sendPaymentSuccessEmail(payment, tenantId);
    } else {
      await this.sendPaymentFailureEmail(payment, tenantId);
    }

    return payment;
  }

  private async sendPaymentSuccessEmail(payment: any, tenantId: number) {
    const { order } = payment;

    await this.emailService.sendEmail({
      tenantId,
      to: order.customer.email,
      subject: `💳 Payment Received - Order #${order.orderNumber}`,
      html: `
        <h2>Payment Successful! 💚</h2>
        <p>Hi ${order.customer.name},</p>
        
        <p>We've received your payment of <strong>$${(payment.amount / 100).toFixed(2)}</strong></p>
        
        <h3>Payment Details</h3>
        <ul>
          <li>Order: #${order.orderNumber}</li>
          <li>Amount: $${(payment.amount / 100).toFixed(2)}</li>
          <li>Date: ${new Date().toLocaleDateString()}</li>
          <li>Transaction ID: ${payment.providerPaymentId}</li>
        </ul>
        
        <p>Your order will be processed and shipped shortly.</p>
        
        <p>Thank you for your business!</p>
      `,
    });
  }

  private async sendPaymentFailureEmail(payment: any, tenantId: number) {
    const { order } = payment;

    await this.emailService.sendEmail({
      tenantId,
      to: order.customer.email,
      subject: `⚠️ Payment Failed - Order #${order.orderNumber}`,
      html: `
        <h2>Payment Could Not Be Processed</h2>
        <p>Hi ${order.customer.name},</p>
        
        <p>Your payment of <strong>$${(payment.amount / 100).toFixed(2)}</strong> could not be processed.</p>
        
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Check your card details</li>
          <li>Make sure you have sufficient funds</li>
          <li>Try a different payment method</li>
        </ol>
        
        <p><a href="https://store.com/checkout">Retry Payment</a></p>
        
        <p>Need help? Contact support@store.com</p>
      `,
    });
  }
}
```

---

## 3️⃣ AUTENTICACIÓN - Recuperación de Contraseña

### **Escenario:** Usuario olvida contraseña → Recibe link de reset

```typescript
// src/modules/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwt: JwtService,
  ) {}

  async forgotPassword(email: string, tenantId: number) {
    // 1. Buscar usuario
    const user = await this.prisma.tenantUser.findUnique({
      where: { tenantId_email: { tenantId, email } },
    });

    if (!user) {
      // Por seguridad, no decir si existe o no
      return { success: true };
    }

    // 2. Crear token de reset
    const resetToken = this.jwt.sign(
      { userId: user.id, tenantId },
      { expiresIn: '1h', secret: process.env.RESET_PASSWORD_SECRET },
    );

    const resetLink = `https://${tenantId}.store.com/reset-password?token=${resetToken}`;

    // 3. Enviar email
    await this.emailService.sendEmail({
      tenantId,
      to: user.email,
      subject: 'Reset Your Password',
      html: `
        <h2>Password Reset Request</h2>
        
        <p>Hi ${user.name},</p>
        
        <p>You requested to reset your password. Click the link below:</p>
        
        <p>
          <a href="${resetLink}" 
             style="background: #007bff; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </p>
        
        <p><small>This link expires in 1 hour.</small></p>
        
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    return { success: true };
  }

  async resetPassword(token: string, newPassword: string, tenantId: number) {
    // 1. Verificar token
    const decoded = this.jwt.verify(token, {
      secret: process.env.RESET_PASSWORD_SECRET,
    });

    // 2. Cambiar contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.tenantUser.update({
      where: { id: decoded.userId },
      data: { passwordHash: hashedPassword },
    });

    // 3. Obtener usuario para enviar confirmación
    const user = await this.prisma.tenantUser.findUnique({
      where: { id: decoded.userId },
    });

    // 4. Enviar email de confirmación
    await this.emailService.sendEmail({
      tenantId,
      to: user.email,
      subject: '✅ Password Changed Successfully',
      html: `
        <h2>Your password has been changed</h2>
        
        <p>Hi ${user.name},</p>
        
        <p>Your password was successfully reset. You can now log in with your new password.</p>
        
        <p><a href="https://${tenantId}.store.com/login">Log In</a></p>
        
        <p>If this wasn't you, please change your password immediately.</p>
      `,
    });

    return { success: true };
  }
}
```

---

## 4️⃣ USUARIOS - Invitación de Staff

### **Escenario:** Admin invita staff → Staff recibe email con credenciales

```typescript
// src/modules/tenant-users/tenant-users.service.ts

import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class TenantUsersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async inviteStaffMember(inviteDto: any, tenantId: number) {
    // 1. Generar contraseña temporal
    const temporaryPassword = Math.random().toString(36).slice(-12);

    // 2. Crear usuario staff
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
    const staffMember = await this.prisma.tenantUser.create({
      data: {
        tenantId,
        email: inviteDto.email,
        name: inviteDto.name,
        passwordHash: hashedPassword,
        role: inviteDto.role || 'staff',
      },
    });

    // 3. Obtener tenant info
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    // 4. Enviar email con credenciales
    await this.emailService.sendEmail({
      tenantId,
      to: staffMember.email,
      subject: `You've been invited to ${tenant.name} Dashboard`,
      html: `
        <h2>Welcome to ${tenant.name}! 👋</h2>
        
        <p>Hi ${staffMember.name},</p>
        
        <p>You've been invited to join ${tenant.name} as a ${staffMember.role}.</p>
        
        <h3>Your Credentials</h3>
        <p>
          <strong>Email:</strong> ${staffMember.email}<br/>
          <strong>Temporary Password:</strong> <code>${temporaryPassword}</code>
        </p>
        
        <p>
          <a href="https://${tenant.slug}.store.com/login"
             style="background: #28a745; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Log In to Dashboard
          </a>
        </p>
        
        <p><strong>⚠️ Important:</strong> Change your password immediately after logging in.</p>
        
        <p>Questions? Contact your admin.</p>
      `,
    });

    return staffMember;
  }

  async removeStaffMember(userId: string, tenantId: number) {
    const user = await this.prisma.tenantUser.findUnique({
      where: { id: userId },
    });

    // 1. Eliminar usuario
    await this.prisma.tenantUser.delete({
      where: { id: userId },
    });

    // 2. Notificar (opcional)
    await this.emailService.sendEmail({
      tenantId,
      to: user.email,
      subject: 'Your Access Has Been Revoked',
      html: `
        <p>Your access to the dashboard has been revoked.</p>
        <p>If you have questions, contact your admin.</p>
      `,
    });
  }
}
```

---

## 5️⃣ NEWSLETTER - Envío Masivo (Ejemplo Avanzado)

### **Escenario:** Admin envía newsletter a todos los clientes

```typescript
// src/modules/newsletters/newsletters.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class NewslettersService {
  private readonly logger = new Logger(NewslettersService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async sendNewsletter(newsletterDto: any, tenantId: number) {
    // 1. Obtener todos los clientes
    const customers = await this.prisma.customer.findMany({
      where: { tenantId, status: 'active' },
      select: { id: true, email: true, name: true },
    });

    this.logger.log(`Sending newsletter to ${customers.length} customers`);

    // 2. Enviar email a cada cliente (en paralelo, pero con límite)
    const batchSize = 10; // 10 en paralelo
    for (let i = 0; i < customers.length; i += batchSize) {
      const batch = customers.slice(i, i + batchSize);

      await Promise.all(
        batch.map((customer) =>
          this.emailService
            .sendEmail({
              tenantId,
              to: customer.email,
              subject: newsletterDto.subject,
              html: this.personalizeNewsletter(
                newsletterDto.html,
                customer.name,
              ),
            })
            .catch((err) => {
              this.logger.error(
                `Failed to send to ${customer.email}: ${err.message}`,
              );
            }),
        ),
      );

      // Esperar 1 segundo entre batches para no sobrecargar
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.logger.log(`Newsletter sent successfully`);
    return { sent: customers.length };
  }

  private personalizeNewsletter(html: string, customerName: string): string {
    return html.replace('{{customer_name}}', customerName);
  }
}
```

---

## 🎯 CHECKLIST DE INTEGRACIÓN

### **Para cada módulo:**

- [ ] Importar `EmailService` en el constructor
- [ ] Envolver llamadas a `emailService.sendEmail()` en try-catch
- [ ] Usar `.catch()` para no bloquear operaciones principales
- [ ] Usar templates HTML profesionales
- [ ] Probar con `/email/test/{tenantId}` antes de producción
- [ ] Loguear errores de email
- [ ] Respetar rate limits

---

## ⚡ TIPS DE RENDIMIENTO

```typescript
// ✅ BIEN: No bloquea
async createOrder(dto) {
  const order = await this.prisma.order.create(dto);
  
  // Fire and forget
  this.emailService.sendEmail(...).catch(err => 
    console.error('Email failed')
  );
  
  return order;
}

// ❌ MAL: Bloquea
async createOrder(dto) {
  const order = await this.prisma.order.create(dto);
  
  // Espera a que termine (malo!)
  await this.emailService.sendEmail(...);
  
  return order;
}

// 🚀 MÁS EFICIENTE: Queue (futuro)
async createOrder(dto) {
  const order = await this.prisma.order.create(dto);
  
  // Agregar a cola (Bull/BullMQ)
  this.emailQueue.add({
    tenantId,
    ...emailOptions
  });
  
  return order;
}
```

---

## ✅ CONCLUSIÓN

**Ahora tienes ejemplos completos de:**
- ✅ Confirmación de órdenes
- ✅ Confirmación de pagos
- ✅ Recuperación de contraseña
- ✅ Invitación de staff
- ✅ Newsletters masivos

**Copiar y adaptar a tus necesidades** 🚀

