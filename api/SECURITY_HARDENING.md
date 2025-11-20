# 🔒 Security Hardening Plan - Rate Limiting, XSS, CSRF, HTTP Headers

**Status**: ⏳ PENDING IMPLEMENTATION  
**Priority**: HIGH for production  
**Date**: 2025-11-20

---

## Current Status vs. Needed Security

| Feature | Status | Impact | Priority |
|---------|--------|--------|----------|
| **Rate Limiting** | ❌ NOT IMPLEMENTED | Brute force, DOS attacks | 🔴 HIGH |
| **CSRF Protection** | ⏳ CONFIG READY | Token forgery, form attacks | 🟡 MEDIUM |
| **XSS Protection** | ✅ FRAMEWORK READY | Frontend - handled by Next.js | 🟢 LOW |
| **HTTP Security Headers** | ❌ NOT IMPLEMENTED | MIME sniffing, clickjacking | 🔴 HIGH |
| **SQL Injection** | ✅ PROTECTED | Prisma parameterized queries | 🟢 SAFE |
| **CORS** | ✅ CONFIGURED | Basic setup done | 🟢 GOOD |

---

## 1. 🚨 Rate Limiting Implementation

### Current Status: ❌ NOT IMPLEMENTED

### Issue: 
- No protection against:
  - Brute force login attacks
  - DOS (Denial of Service)
  - API abuse

### Solution: Express Rate Limit + Nestjs Throttler

#### Step 1: Install Dependencies
```bash
npm install @nestjs/throttler express-rate-limit
```

#### Step 2: Add to AppModule
```typescript
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,        // 1 minute
        limit: 10,         // 10 requests per minute
      },
    ]),
    // ... other imports
  ],
})
export class AppModule {}
```

#### Step 3: Add Per-Endpoint Rate Limits
```typescript
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 900000 } })  // 5 requests per 15 minutes
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 3600000 } })  // 3 requests per hour
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  @Throttle({ default: { limit: 20, ttl: 60000 } })  // 20 requests per minute
  refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
```

#### Step 4: Rate Limit by Tenant ID (Optional)
```typescript
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';

@UseGuards(ThrottlerGuard)
@Controller('api/v1/products')
export class ProductsController {
  @Get()
  @Throttle({ default: { limit: 100, ttl: 60000 } })  // Per user: 100 req/min
  findAll(@CurrentTenant() tenantId: number) {
    return this.productsService.findAllByTenant(tenantId);
  }
}
```

#### Custom Throttle Key (per IP + Tenant):
```typescript
// src/modules/auth/guards/throttle-by-tenant.guard.ts
import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottleByTenantGuard extends ThrottlerGuard {
  protected getTracker(request: Record<string, any>): string {
    // Combine IP + tenantId for more granular rate limiting
    const ip = request.ip || request.connection.remoteAddress;
    const tenantId = request.user?.tenantId || 'anonymous';
    return `${ip}:${tenantId}`;
  }
}
```

---

## 2. 🛡️ HTTP Security Headers Implementation

### Current Status: ❌ NOT IMPLEMENTED

### Headers to Add:

#### Option A: Using Helmet (RECOMMENDED)
```bash
npm install helmet
```

Update `main.ts`:
```typescript
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet({
    // Prevent MIME type sniffing
    noSniff: true,
    
    // Prevent clickjacking
    frameguard: { action: 'deny' },
    
    // Disable browser XSS filter (modern browsers handle this)
    xssFilter: false,
    
    // Strict Transport Security
    hsts: {
      maxAge: 31536000,  // 1 year
      includeSubDomains: true,
      preload: true,
    },
    
    // Content Security Policy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
      },
    },
  }));

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  // ... rest of bootstrap
}
```

#### Option B: Manual Headers
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    // Strict Transport Security
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Prevent MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // CSP - Content Security Policy
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    
    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions Policy (formerly Feature-Policy)
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    next();
  });

  // ... rest of bootstrap
}
```

---

## 3. 🔐 CSRF Protection Implementation

### Current Status: ⏳ PARTIALLY READY (CORS + JWT)

### Why JWT + CORS Already Helps:
- ✅ CORS prevents cross-origin requests without explicit allowlist
- ✅ JWT in Authorization header (not cookies) is CSRF-resistant
- ✅ SameSite cookies not used (using JWT instead)

### But: Add CSRF Token for Web Forms (Optional)

#### Step 1: Install CSRF Library
```bash
npm install csurf cookie-parser
```

#### Step 2: Add CSRF Middleware
```typescript
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser required for CSRF
  app.use(cookieParser());

  // CSRF protection (except for JWT-protected APIs)
  const csrfProtection = csrf({ cookie: true });
  app.use('/forms', csrfProtection);  // Only for form endpoints

  // ... rest of bootstrap
}
```

#### Step 3: Create CSRF Token Endpoint
```typescript
@Controller('api/v1/auth')
export class AuthController {
  @Get('csrf-token')
  getCsrfToken(@Res() res: Response) {
    // Generate CSRF token and include in response
    const token = res.req.csrfToken();
    return { csrfToken: token };
  }

  @Post('login')
  @UseGuards(CsrfGuard)  // Custom guard for form submissions
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

### Note for Stateless API:
Since this is a **stateless JWT API**, CSRF is less critical because:
- ✅ Credentials are in Authorization header (not cookies)
- ✅ Cross-origin requests are blocked by CORS
- ✅ No session state to exploit

**Recommendation**: Skip CSRF for JSON API, implement only if using cookies.

---

## 4. 🛡️ XSS Protection Status

### Current Status: ✅ MOSTLY PROTECTED

### Why XSS is NOT a Backend Concern Here:
1. **JSON API Only**: Backend returns JSON, not HTML/templates
2. **Frontend Framework**: Next.js automatically escapes output
3. **No Cookie Storage**: JWT stored in frontend (localStorage/sessionStorage)
4. **No Inline Scripts**: No server-rendered templates with user input

### What IS Protected:
- ✅ Input validation via `class-validator` (whitelist approach)
- ✅ Output escaping handled by React/Next.js
- ✅ No user input in response headers
- ✅ CSP headers (from Helmet) prevent inline scripts

### Frontend Responsibility:
- Escape user input in templates (React does this by default)
- Avoid `dangerouslySetInnerHTML` unless sanitized
- Use DOMPurify for rich text content if needed

---

## 5. 📝 Enhanced main.ts with All Security

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============ SECURITY HEADERS (Helmet) ============
  app.use(helmet({
    noSniff: true,
    frameguard: { action: 'deny' },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:3001'],
      },
    },
  }));

  // ============ CORS (CSRF Protection) ============
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ============ COOKIES (for CSRF if needed) ============
  app.use(cookieParser());

  // ============ INPUT VALIDATION ============
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error on unknown properties
      transform: true,          // Transform payloads
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ============ GLOBAL PREFIX ============
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on: http://localhost:${port}/api/v1`);
  console.log(`🔒 Security hardened:`);
  console.log(`   ✅ Helmet headers enabled`);
  console.log(`   ✅ CORS configured`);
  console.log(`   ✅ Input validation active`);
  console.log(`   ✅ Rate limiting ready (via @Throttle decorator)`);
}

bootstrap();
```

---

## 6. 📊 Implementation Checklist

### Phase 1: HTTP Headers (IMMEDIATE)
- [ ] Install & configure Helmet
- [ ] Test all headers with security scanner
- [ ] Update main.ts
- [ ] Deploy and verify

### Phase 2: Rate Limiting (SHORT TERM)
- [ ] Install @nestjs/throttler
- [ ] Configure ThrottlerModule
- [ ] Add rate limits to auth endpoints
- [ ] Add rate limits to public endpoints
- [ ] Add custom tenant-based throttling

### Phase 3: CSRF (OPTIONAL - if web forms)
- [ ] Install csurf
- [ ] Add CSRF middleware
- [ ] Create CSRF token endpoint
- [ ] Update forms to include token

### Phase 4: Monitoring
- [ ] Add logging for rate limit violations
- [ ] Set up alerts for security events
- [ ] Monitor failed login attempts
- [ ] Track token revocation patterns

---

## 7. 🧪 Testing Security

### Test Rate Limiting:
```bash
# Should fail after 5 requests
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
  sleep 0.5
done
# After 5: 429 Too Many Requests
```

### Test Headers:
```bash
curl -I http://localhost:3000/api/v1/products
# Check for:
# - Strict-Transport-Security
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - Content-Security-Policy
```

### Test CORS:
```bash
# From different origin
curl -X GET http://localhost:3000/api/v1/products \
  -H "Origin: https://evil.com"
# Should be blocked with CORS error
```

---

## 8. Environment Variables

Add to `.env`:
```env
# Security
FRONTEND_URL=http://localhost:3001
NODE_ENV=production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10

# CORS
CORS_ORIGIN=http://localhost:3001,https://yourdomain.com

# HTTP Headers
HSTS_MAX_AGE=31536000
CSP_REPORT_URI=https://yourdomain.com/csp-report
```

---

## 9. 🚀 Production Deployment Checklist

- [ ] All headers configured (Helmet)
- [ ] Rate limiting active on all sensitive endpoints
- [ ] CORS whitelist updated (only allow frontend URL)
- [ ] HTTPS enabled (required for HSTS)
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials not in code
- [ ] Logging configured (without sensitive data)
- [ ] Error messages don't leak system info
- [ ] Security headers tested with Security Headers scanner

---

## 10. 📚 Resources

- [OWASP Top 10](https://owasp.org/Top10/)
- [Helmet.js](https://helmetjs.github.io/)
- [Nestjs Throttler](https://docs.nestjs.com/security/rate-limiting)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Headers](https://securityheaders.com/)

---

**Next Steps**: 
1. ✅ Implement Helmet for HTTP headers (HIGH PRIORITY)
2. ✅ Add rate limiting to auth endpoints (HIGH PRIORITY)
3. ⏳ Test with security scanner (medium priority)
4. ⏳ Add CSRF if using web forms (low priority for API)

**Estimated Implementation Time**: 2-3 hours for all features
