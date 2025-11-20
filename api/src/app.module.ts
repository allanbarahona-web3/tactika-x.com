import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TenantUsersModule } from './modules/tenant-users/tenant-users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { TenantContextMiddleware } from './common/middleware/tenant-context.middleware';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 🚨 Rate Limiting / Throttling
    // Global rate limit: 100 requests per 60 seconds
    // Can be overridden per endpoint with @Throttle() decorator
    ThrottlerModule.forRoot([
      {
        ttl: 60000,    // Time window in milliseconds (60 seconds)
        limit: 100,    // Max requests per window
      },
    ]),
    
    // Prisma para acceso a base de datos
    PrismaModule,
    
    // Common (guards, decorators, services globales)
    CommonModule,
    
    // Módulos de negocio
    AuthModule,
    TenantsModule,
    TenantUsersModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantContextMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}
