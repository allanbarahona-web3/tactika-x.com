# 🧪 Security Testing Guide

Este documento contiene ejemplos de cómo probar todas las medidas de seguridad implementadas.

---

## 1. 🚨 Rate Limiting Tests

### Test: Rate Limit Login (5 requests per 15 minutes)
```bash
# Debería fallar después del 5to intento
for i in {1..10}; do
  echo "Request $i at $(date +%H:%M:%S)"
  curl -X POST http://localhost:3000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}' \
    -w "\nStatus: %{http_code}\n" \
    -s
  sleep 1
done

# Resultado esperado:
# Request 1-5: 200 or 401 (credential error is ok)
# Request 6-10: 429 (Too Many Requests)
```

### Test: Rate Limit Register (3 requests per hour)
```bash
# Máximo 3 registros por hora
for i in {1..5}; do
  echo "Register attempt $i"
  curl -X POST http://localhost:3000/api/v1/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"user$i@test.com\",\"password\":\"Test@123\",\"tenantId\":1}" \
    -w "\nStatus: %{http_code}\n" \
    -s
  sleep 2
done

# Resultado esperado:
# Request 1-3: 201 (Created)
# Request 4-5: 429 (Too Many Requests)
```

### Test: Read Endpoints NOT Rate Limited
```bash
# Unlimited reads (SkipThrottle applied)
for i in {1..50}; do
  curl -X GET http://localhost:3000/api/v1/products \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -s -o /dev/null -w "Status: %{http_code}\n"
done

# Resultado esperado: Todos 200 (ninguno 429)
```

---

## 2. 🛡️ HTTP Security Headers Tests

### Test: Headers Presentes
```bash
curl -I http://localhost:3000/api/v1/products

# Debería mostrar:
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; ...
# Referrer-Policy: strict-origin-when-cross-origin
# Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Test: Header Values
```bash
# Verificar HSTS
curl -I http://localhost:3000/api/v1/products | grep "Strict-Transport-Security"
# Debería mostrar: max-age=31536000

# Verificar X-Frame-Options (prevención de clickjacking)
curl -I http://localhost:3000/api/v1/products | grep "X-Frame-Options"
# Debería mostrar: DENY

# Verificar X-Content-Type-Options (prevención MIME sniffing)
curl -I http://localhost:3000/api/v1/products | grep "X-Content-Type-Options"
# Debería mostrar: nosniff
```

---

## 3. 🌐 CORS Tests

### Test: CORS Blocked para Origin No Permitido
```bash
# Intentar acceso desde origin no permitido
curl -X GET http://localhost:3000/api/v1/products \
  -H "Origin: https://evil.com" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -v

# Resultado esperado:
# ❌ No se recibe header Access-Control-Allow-Origin
# Navegadores bloquearan la respuesta (CORS error)
```

### Test: CORS Permitido para Origin Configurado
```bash
# Intentar acceso desde origin permitido (frontend)
curl -X GET http://localhost:3000/api/v1/products \
  -H "Origin: http://localhost:3001" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -v

# Resultado esperado:
# ✅ Access-Control-Allow-Origin: http://localhost:3001
# ✅ Access-Control-Allow-Credentials: true
```

---

## 4. ✅ Input Validation Tests

### Test: Whitelist (Unknown Properties Rejected)
```bash
# Intentar enviar propiedad desconocida
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "email":"test@test.com",
    "password":"Test@123",
    "tenantId":1,
    "adminRoles":["ADMIN"]  # ← Propiedad no autorizada
  }' \
  -w "\nStatus: %{http_code}\n"

# Resultado esperado: 400 Bad Request (forbidNonWhitelisted)
```

### Test: Valid Input Accepted
```bash
# Enviar solo propiedades autorizadas
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@test.com",
    "password":"Test@123",
    "tenantId":1
  }' \
  -w "\nStatus: %{http_code}\n"

# Resultado esperado: 201 Created
```

---

## 5. 🔐 JWT + JTI Revocation Tests

### Test: Token Revocado No Funciona
```bash
# 1. Obtener token
TOKEN=$(curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}' \
  -s | jq -r '.accessToken')

# 2. Usar token exitosamente
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN" \
  -w "\nStatus: %{http_code}\n"
# Resultado: 200 OK

# 3. Revocar token (logout)
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"'$REFRESH_TOKEN'"}' \
  -w "\nStatus: %{http_code}\n"
# Resultado: 200 OK

# 4. Intentar usar token revocado
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN" \
  -w "\nStatus: %{http_code}\n"
# Resultado esperado: 401 Unauthorized (revoked token)
```

### Test: Revoke All User Tokens
```bash
# Revocar todos los tokens del usuario (cambio de password)
curl -X POST http://localhost:3000/api/v1/auth/revoke-all \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n"
# Resultado: 200 OK

# Todos los tokens del usuario ahora no funcionan
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN" \
  -w "\nStatus: %{http_code}\n"
# Resultado esperado: 401 Unauthorized
```

---

## 6. 🔒 Row-Level Security (RLS) Tests

### Test: Tenant Isolation
```bash
# Usuario de Tenant 1 intenta acceder a datos de Tenant 2
# (aunque el código intente solicitar tenantId: 2)

TOKEN_TENANT_1=$(curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tenant1@test.com","password":"password"}' \
  -s | jq -r '.accessToken')

# Intentar acceder a productos de tenant 2 (aunque esto debería estar prohibido en la app)
curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer $TOKEN_TENANT_1"

# RLS filtra automáticamente - solo devuelve productos de tenant 1
# Resultado: Array vacío si no tiene productos, o solo sus productos
```

---

## 7. 🧪 Combined Security Test Script

```bash
#!/bin/bash
# save as: test-security.sh

echo "🔒 Starting Security Tests..."
echo ""

BASE_URL="http://localhost:3000/api/v1"

# 1. Test Rate Limiting
echo "1️⃣ Testing Rate Limiting (5 login attempts in 15 min)..."
for i in {1..7}; do
  STATUS=$(curl -X POST $BASE_URL/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}' \
    -s -w "%{http_code}" -o /dev/null)
  
  if [ $i -le 5 ]; then
    if [ $STATUS -eq 200 ] || [ $STATUS -eq 401 ]; then
      echo "   Request $i: ✅ $STATUS (allowed)"
    else
      echo "   Request $i: ❌ $STATUS (unexpected)"
    fi
  else
    if [ $STATUS -eq 429 ]; then
      echo "   Request $i: ✅ $STATUS (rate limited)"
    else
      echo "   Request $i: ❌ $STATUS (should be 429)"
    fi
  fi
done
echo ""

# 2. Test Headers
echo "2️⃣ Testing HTTP Security Headers..."
HEADERS=$(curl -I $BASE_URL/products 2>/dev/null)

if echo "$HEADERS" | grep -q "Strict-Transport-Security"; then
  echo "   ✅ HSTS header present"
else
  echo "   ❌ HSTS header missing"
fi

if echo "$HEADERS" | grep -q "X-Content-Type-Options: nosniff"; then
  echo "   ✅ X-Content-Type-Options present"
else
  echo "   ❌ X-Content-Type-Options missing"
fi

if echo "$HEADERS" | grep -q "X-Frame-Options: DENY"; then
  echo "   ✅ X-Frame-Options present"
else
  echo "   ❌ X-Frame-Options missing"
fi

if echo "$HEADERS" | grep -q "Content-Security-Policy"; then
  echo "   ✅ CSP header present"
else
  echo "   ❌ CSP header missing"
fi
echo ""

# 3. Test CORS
echo "3️⃣ Testing CORS Protection..."
CORS=$(curl -X GET "$BASE_URL/products" \
  -H "Origin: https://evil.com" \
  -s -i 2>/dev/null)

if echo "$CORS" | grep -q "Access-Control-Allow-Origin"; then
  echo "   ❌ CORS too permissive (should not allow evil.com)"
else
  echo "   ✅ CORS blocked for unauthorized origin"
fi
echo ""

echo "✅ Security tests completed!"
```

Ejecutar:
```bash
chmod +x test-security.sh
./test-security.sh
```

---

## 8. 🔧 Production Readiness Checklist

- ✅ Rate limiting configured per endpoint
- ✅ Helmet headers enabled (CSP, HSTS, X-Frame-Options, etc.)
- ✅ CORS whitelist enforced
- ✅ Input validation with whitelist
- ✅ JWT + JTI revocation working
- ✅ ACID transactions in critical paths
- ✅ RLS policies enforcing tenant isolation
- ✅ Password hashing with bcrypt
- ✅ HTTPS ready (HSTS, CSP, Secure flag for cookies)

---

## 9. 📊 Expected Response Examples

### Normal Request (200)
```bash
curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Response
{
  "statusCode": 200,
  "message": "Products retrieved successfully",
  "data": [...]
}
```

### Rate Limited (429)
```bash
curl -X GET http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrong"}' \
  # (after exceeding limit)

# Response
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests",
  "error": "Too Many Requests"
}
```

### Invalid Input (400)
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123","unknownField":"value"}'

# Response
{
  "statusCode": 400,
  "message": "property unknownField should not exist",
  "error": "Bad Request"
}
```

### JWT Revoked (401)
```bash
curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  # (after logout - token revoked)

# Response
{
  "statusCode": 401,
  "message": "Unauthorized - Token has been revoked",
  "error": "Unauthorized"
}
```

---

## 10. 🚀 Next Steps

1. **Test en Development**:
   - Ejecutar `test-security.sh` localmente
   - Verificar todos los headers con browser DevTools
   - Probar rate limiting manualmente

2. **Test en Staging**:
   - Ejecutar suite de tests
   - Load testing con JMeter o k6
   - Monitorear performance

3. **Test en Production**:
   - Usar security scanner (OWASP ZAP, Burp Suite)
   - Monitorear logs de rate limiting
   - Verificar HSTS preload list inclusion

4. **Monitoring**:
   - Setup alertas para rate limit violations
   - Monitorear JWT revocation patterns
   - Track security incidents

---

**Documento creado**: 2025-11-20  
**Status**: READY FOR TESTING  
**Build**: 0 errors
