import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TokenService } from './services/token.service';
import { StorageService } from './services/storage.service';
import { DOSpacesService } from './services/do-spaces.service';
import { CryptoService } from './services/crypto.service';

@Global()
@Module({
  providers: [
    TokenService,
    StorageService,
    DOSpacesService,
    CryptoService,
    // 🚨 Apply ThrottlerGuard globally to all routes
    // Can be disabled per endpoint with @SkipThrottle() decorator
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [TokenService, StorageService, DOSpacesService, CryptoService],
})
export class CommonModule {}
