'use client';

import { useState } from 'react';

export default function LoginModalContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Replace with real API call
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Mock login - show OTP step
    setShowOtp(true);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('Código OTP debe tener 6 dígitos');
      return;
    }

    // Mock verification - show 2FA setup
    setShowQr(true);
  };

  return (
    <div className="login-content">
      {!showOtp && !showQr && (
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Iniciar Sesión
          </button>

          <div className="login-footer">
            <a href="#">¿Olvidaste tu contraseña?</a>
            <a href="#">Crear cuenta</a>
          </div>
        </form>
      )}

      {showOtp && !showQr && (
        <form onSubmit={handleOtpSubmit} className="login-form">
          <div className="otp-header">
            <i className="fas fa-shield-alt" style={{ fontSize: 48, color: '#ff6b35' }}></i>
            <h3>Verificación OTP</h3>
            <p>Ingresa el código enviado a {email}</p>
          </div>

          <div className="form-group">
            <label>Código OTP</label>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              style={{ textAlign: 'center', fontSize: 24, letterSpacing: 8 }}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Verificar Código
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: 10 }}
            onClick={() => setShowOtp(false)}
          >
            Volver
          </button>
        </form>
      )}

      {showQr && (
        <div className="qr-setup">
          <div className="qr-header">
            <i className="fas fa-qrcode" style={{ fontSize: 48, color: '#ff6b35' }}></i>
            <h3>Configurar Autenticación 2FA</h3>
            <p>Escanea este código QR con Google Authenticator</p>
          </div>

          <div className="qr-code-placeholder">
            {/* Mock QR Code */}
            <div
              style={{
                width: 200,
                height: 200,
                background: '#fff',
                border: '2px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <i className="fas fa-qrcode" style={{ fontSize: 120, color: '#ccc' }}></i>
            </div>
          </div>

          <div className="qr-instructions">
            <h4>Instrucciones:</h4>
            <ol>
              <li>Descarga Google Authenticator</li>
              <li>Escanea el código QR</li>
              <li>Ingresa el código generado</li>
            </ol>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }}>
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
