import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TokenService } from './services/token.service';

@Global()
@Module({
  providers: [
    TokenService,
    // 🚨 Apply ThrottlerGuard globally to all routes
    // Can be disabled per endpoint with @SkipThrottle() decorator
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [TokenService],
})
export class CommonModule {}
