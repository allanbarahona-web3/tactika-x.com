import { PrismaClient, TenantUserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Limpiar datos existentes (solo en desarrollo)
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.authSession.deleteMany();
  await prisma.tenantUser.deleteMany();
  await prisma.tenant.deleteMany();

  // Crear tenants de ejemplo
  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Barmentech',
      slug: 'barmentech',
      status: 'active',
      billingStatus: 'ok',
      industry: 'SaaS Platform',
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'ARMAS / TACTIKA-X',
      slug: 'armas',
      status: 'active',
      billingStatus: 'ok',
      industry: 'Tactical Equipment',
    },
  });

  console.log(`✅ Created tenants: ${tenant1.name}, ${tenant2.name}`);

  // Crear dominios para cada tenant
  const domain1 = await prisma.tenantDomain.create({
    data: {
      tenantId: tenant1.id,
      domain: 'commerce.barmentech.com',
      isPrimary: true,
      isActive: true,
    },
  });

  const domain1Vercel = await prisma.tenantDomain.create({
    data: {
      tenantId: tenant1.id,
      domain: 'barmentech-saas.vercel.app',
      isPrimary: false,
      isActive: true,
    },
  });

  const domain2 = await prisma.tenantDomain.create({
    data: {
      tenantId: tenant2.id,
      domain: 'tactika-x.com',
      isPrimary: true,
      isActive: true,
    },
  });

  const domain2Vercel = await prisma.tenantDomain.create({
    data: {
      tenantId: tenant2.id,
      domain: 'tactika-x-app.vercel.app',
      isPrimary: false,
      isActive: true,
    },
  });

  console.log(`✅ Created domains: ${domain1.domain}, ${domain2.domain}`);

  // Crear usuarios internos (TenantUser)
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.tenantUser.create({
    data: {
      email: 'admin@barmentech.com',
      passwordHash: hashedPassword,
      name: 'Admin Barmentech',
      role: TenantUserRole.owner,
      tenantId: tenant1.id,
      status: 'active',
    },
  });

  const managerUser = await prisma.tenantUser.create({
    data: {
      email: 'admin@armas.com',
      passwordHash: hashedPassword,
      name: 'Admin ARMAS',
      role: TenantUserRole.owner,
      tenantId: tenant2.id,
      status: 'active',
    },
  });

  console.log(`✅ Created tenant users: ${adminUser.email}, ${managerUser.email}`);

  // Crear clientes (Customer)
  const customer1 = await prisma.customer.create({
    data: {
      email: 'cliente1@example.com',
      name: 'Juan Pérez',
      phone: '+1234567890',
      tenantId: tenant1.id,
      status: 'active',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      email: 'cliente2@example.com',
      name: 'María García',
      phone: '+0987654321',
      tenantId: tenant1.id,
      status: 'active',
    },
  });

  console.log(`✅ Created customers: ${customer1.name}, ${customer2.name}`);

  // Crear productos para tenant 1
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Laptop HP 15"',
        slug: 'laptop-hp-15',
        description: 'Laptop HP con procesador Intel i5, 8GB RAM, 256GB SSD',
        price: 79999, // Precio en centavos: $799.99
        stock: 10,
        productKind: 'physical',
        tenantId: tenant1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mouse Inalámbrico Logitech',
        slug: 'mouse-logitech',
        description: 'Mouse inalámbrico ergonómico con batería de larga duración',
        price: 2999, // $29.99
        stock: 50,
        productKind: 'physical',
        tenantId: tenant1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Teclado Mecánico RGB',
        slug: 'teclado-mecanico-rgb',
        description: 'Teclado mecánico con switches azules y retroiluminación RGB',
        price: 8999, // $89.99
        stock: 25,
        productKind: 'physical',
        tenantId: tenant1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Curso de Programación Online',
        slug: 'curso-programacion',
        description: 'Curso completo de desarrollo web full-stack',
        price: 19999, // $199.99
        stock: 999,
        productKind: 'digital',
        tenantId: tenant1.id,
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products for ${tenant1.name}`);

  // Crear una orden de ejemplo
  const order = await prisma.order.create({
    data: {
      tenantId: tenant1.id,
      customerId: customer1.id,
      orderNumber: 'ORD-20241118-0001',
      status: 'pending',
      subtotalAmount: 11998, // 2 x $29.99 + 1 x $89.99 = $119.98
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      totalAmount: 11998,
      currency: 'USD',
      items: {
        create: [
          {
            tenantId: tenant1.id,
            productId: products[1].id,
            quantity: 2,
            unitPrice: 2999,
            totalPrice: 5998,
          },
          {
            tenantId: tenant1.id,
            productId: products[2].id,
            quantity: 1,
            unitPrice: 8999,
            totalPrice: 8999,
          },
        ],
      },
    },
    include: {
      items: true,
    },
  });

  console.log(`✅ Created order ${order.orderNumber} with ${order.items.length} items`);

  // Crear un pago para la orden
  const payment = await prisma.payment.create({
    data: {
      tenantId: tenant1.id,
      orderId: order.id,
      status: 'paid',
      amount: 11998,
      currency: 'USD',
      provider: 'stripe',
      providerPaymentId: 'pi_test_123456789',
      idempotencyKey: 'idem_' + Date.now(),
    },
  });

  console.log(`✅ Created payment for order ${order.orderNumber}`);

  // Actualizar estado de la orden a pagada
  await prisma.order.update({
    where: { id: order.id },
    data: { status: 'paid' },
  });

  console.log('🎉 Seeding completed!');
  console.log('\n📊 Summary:');
  console.log(`  - Tenants: 2 (Barmentech, ARMAS)`);
  console.log(`  - Tenant Users: 2`);
  console.log(`  - Customers: 2`);
  console.log(`  - Products: ${products.length}`);
  console.log(`  - Orders: 1`);
  console.log(`  - Payments: 1`);
  console.log('\n🔐 Login credentials:');
  console.log(`  Barmentech - Email: admin@barmentech.com`);
  console.log(`  ARMAS - Email: admin@armas.com`);
  console.log(`  Password: password123`);
  console.log('\n🌐 Domains:');
  console.log(`  Barmentech: commerce.barmentech.com (ID: ${tenant1.id})`);
  console.log(`  ARMAS: tactika-x.com (ID: ${tenant2.id})`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
