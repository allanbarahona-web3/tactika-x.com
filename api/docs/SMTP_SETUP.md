# 📧 CONFIGURACIÓN SMTP POR TENANT - GUÍA COMPLETA

## 🎯 Resumen de Solución

Se implementa soporte SMTP multi-tenant almacenando la configuración en el campo `config` JSON de la tabla `tenants`.

**Ventajas:**
- ✅ No requiere migración de BD
- ✅ Flexible para agregar nuevos campos
- ✅ Cada tenant controla su SMTP
- ✅ Soporta múltiples proveedores (SMTP, SendGrid, Mailgun, AWS SES)
- ✅ Passwords encriptados en BD

---

## 🗄️ ESTRUCTURA DE LA BASE DE DATOS

### Tabla: `tenants` (EXISTENTE)

```sql
-- Campo JSON existente: tenants.config
-- Estructura a agregar dentro de config JSON:

{
  "email": {
    "provider": "smtp",                    -- smtp | sendgrid | mailgun | aws-ses
    "host": "smtp.gmail.com",              -- Solo para SMTP
    "port": 587,                           -- Solo para SMTP
    "secure": false,                       -- true = 465 (SSL), false = 587 (TLS)
    "auth": {
      "user": "barmentech@gmail.com",      -- Usuario SMTP
      "pass": "encrypted:..."              -- Password encriptado
    },
    "apiKey": null,                        -- Para SendGrid/Mailgun (encriptado)
    "domain": null,                        -- Para Mailgun
    "fromAddress": "noreply@barmentech.com",
    "fromName": "Barmentech Store",
    "replyToAddress": "support@barmentech.com",
    "isActive": true
  },
  "timezone": "America/El_Salvador",
  "currency": "USD",
  "language": "es"
}
```

---

## 📝 INSTRUCCIONES DE INSTALACIÓN

### 1. INSTALAR DEPENDENCIAS

```bash
cd /home/allanb/tactika-x/api

npm install nodemailer
npm install --save-dev @types/nodemailer

# Opcional: para SendGrid
npm install @sendgrid/mail

# Opcional: para AWS SES
npm install @aws-sdk/client-ses

pnpm install
```

### 2. CREAR SERVICIO DE ENCRIPTACIÓN

Necesitamos encriptar passwords antes de guardarlos. Ya existe `CryptoService`:

```bash
# Verificar que CryptoService existe en:
# src/common/services/crypto.service.ts
```

### 3. CREAR MÓDULO DE EMAIL

```bash
# Esto ya está creado en:
# src/modules/email/email.service.ts
# src/modules/email/email.controller.ts (próximo paso)
```

---

## 🔐 ENCRIPTACIÓN DE PASSWORDS

### Guardar configuración SMTP (Controller)

```typescript
// src/modules/tenants/tenants.controller.ts

@Post(':id/email-config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('owner')
async configureEmail(
  @Param('id', ParseIntPipe) tenantId: number,
  @Body() emailConfig: SmtpConfig,
  @Request() req,
) {
  // 1. Validar que el usuario es dueño del tenant
  if (req.user.tenantId !== tenantId) {
    throw new ForbiddenException('Unauthorized');
  }

  // 2. Encriptar password/apiKey
  if (emailConfig.auth?.pass) {
    emailConfig.auth.pass = `encrypted:${this.cryptoService.encrypt(emailConfig.auth.pass)}`;
  }
  if (emailConfig.apiKey) {
    emailConfig.apiKey = `encrypted:${this.cryptoService.encrypt(emailConfig.apiKey)}`;
  }

  // 3. Guardar en tenants.config
  const tenant = await this.prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { config: true },
  });

  const updatedConfig = {
    ...tenant.config,
    email: emailConfig,
  };

  await this.prisma.tenant.update({
    where: { id: tenantId },
    data: { config: updatedConfig },
  });

  return { success: true, message: 'Email config saved' };
}
```

### Desencriptar al enviar email (Service)

```typescript
// src/modules/email/email.service.ts

// Línea 119-121 (createSmtpTransporter):
const password = config.auth?.pass.startsWith('encrypted:')
  ? this.cryptoService.decrypt(config.auth.pass.replace('encrypted:', ''))
  : config.auth?.pass;
```

---

## 📤 CASOS DE USO: CUÁNDO ENVIAR EMAILS

### 1. **Confirmación de Pedido**
```typescript
// orders.service.ts - después de crear orden
await this.emailService.sendEmail({
  tenantId: order.tenantId,
  to: customer.email,
  subject: `Order ${order.orderNumber} confirmed`,
  html: `<h1>Gracias por tu compra</h1>...`,
});
```

### 2. **Confirmación de Pago**
```typescript
// payments.service.ts - después de pagado
await this.emailService.sendEmail({
  tenantId: payment.tenantId,
  to: customer.email,
  subject: 'Payment Received',
  html: `Payment of $${payment.amount} received...`,
});
```

### 3. **Notificación de Envío**
```typescript
// orders.service.ts - cuando estado = shipped
await this.emailService.sendEmail({
  tenantId: order.tenantId,
  to: customer.email,
  subject: 'Your order is on the way',
  html: `Tracking: ${trackingNumber}...`,
});
```

### 4. **Restablecimiento de Contraseña**
```typescript
// auth.service.ts
await this.emailService.sendEmail({
  tenantId: req.tenantIdFromHost,
  to: user.email,
  subject: 'Reset your password',
  html: `Click here: ${resetLink}...`,
});
```

### 5. **Bienvenida de Usuario**
```typescript
// tenant-users.service.ts - nuevo staff
await this.emailService.sendEmail({
  tenantId: tenantId,
  to: newUser.email,
  subject: 'Welcome to Barmentech',
  html: `Your account has been created...`,
});
```

---

## 🎮 CONFIGURACIÓN POR PROVEEDOR

### SMTP Estándar (Gmail, etc.)

```json
{
  "provider": "smtp",
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "tu_email@gmail.com",
    "pass": "app_specific_password"
  },
  "fromAddress": "noreply@tutienda.com",
  "fromName": "Tu Tienda",
  "isActive": true
}
```

### SendGrid

```json
{
  "provider": "sendgrid",
  "apiKey": "SG.xxxxxxxxx",
  "fromAddress": "noreply@tutienda.com",
  "fromName": "Tu Tienda",
  "isActive": true
}
```

### Mailgun

```json
{
  "provider": "mailgun",
  "domain": "mail.tutienda.com",
  "apiKey": "key-xxxxx",
  "fromAddress": "noreply@mail.tutienda.com",
  "fromName": "Tu Tienda",
  "isActive": true
}
```

### AWS SES

```json
{
  "provider": "aws-ses",
  "region": "us-east-1",
  "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
  "secretAccessKey": "encrypted:...",
  "fromAddress": "noreply@tutienda.com",
  "fromName": "Tu Tienda",
  "isActive": true
}
```

---

## 🛠️ ENDPOINTS REST

### Guardar configuración SMTP

```http
POST /tenants/{tenantId}/email-config
Authorization: Bearer {token}
Content-Type: application/json

{
  "provider": "smtp",
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "barmentech@gmail.com",
    "pass": "app_password"
  },
  "fromAddress": "noreply@barmentech.com",
  "fromName": "Barmentech Store",
  "isActive": true
}
```

### Verificar configuración SMTP

```http
POST /tenants/{tenantId}/verify-email-config
Authorization: Bearer {token}

Response:
{
  "valid": true,
  "message": "SMTP configuration is working"
}
```

### Obtener configuración (sin password)

```http
GET /tenants/{tenantId}/email-config
Authorization: Bearer {token}

Response:
{
  "provider": "smtp",
  "host": "smtp.gmail.com",
  "port": 587,
  "fromAddress": "noreply@barmentech.com",
  "fromName": "Barmentech Store",
  "isActive": true,
  "auth": {
    "user": "barmentech@gmail.com",
    "pass": "***" // Nunca devolver el password real
  }
}
```

---

## 🔒 SEGURIDAD

### Principios aplicados:

1. **Encriptación de Passwords**
   - Se encriptan antes de guardar en BD
   - Se desencriptan solo al enviar email
   - Nunca se devuelven encriptados en API responses

2. **RLS en Base de Datos**
   - Tenant A NO puede ver email config de Tenant B
   - Validación a nivel de middleware

3. **Validación de Roles**
   - Solo "owner" puede configurar SMTP
   - Staff no puede ver/modificar

4. **Rate Limiting**
   - Máximo 100 emails/minuto por tenant
   - Evita spam masivo

---

## 📊 TABLA DE COSTOS (Comparativa de Proveedores)

| Proveedor | Precio | Límite | Mejor para |
|-----------|--------|--------|-----------|
| **SMTP Propio** | $0 | Ilimitado | Bajo volumen |
| **Gmail SMTP** | $0 | 500/día | Desarrollo |
| **SendGrid** | $10-300/mes | 100K emails | Volumen medio-alto |
| **Mailgun** | $0-35/mes | 10K gratis | Startup |
| **AWS SES** | $0.10/1K | Ilimitado | Volumen muy alto |

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Crear `email.service.ts` ← HECHO
2. ⏳ Crear `email.controller.ts`
3. ⏳ Crear `email.module.ts`
4. ⏳ Agregar endpoints en `tenants.controller.ts`
5. ⏳ Integrar en `orders.service.ts`
6. ⏳ Integrar en `payments.service.ts`
7. ⏳ Integrar en `auth.service.ts`
8. ⏳ Crear templates de email HTML

---

## 📚 REFERENCIAS

- [Nodemailer Docs](https://nodemailer.com/)
- [SendGrid SMTP Relay](https://sendgrid.com/docs/for-developers/sending-email/smtp-service/)
- [Mailgun SMTP](https://www.mailgun.com/)
- [AWS SES](https://aws.amazon.com/ses/)

