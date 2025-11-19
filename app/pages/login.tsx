import { useState, FormEvent } from 'react';
// ...global styles are imported in _app.tsx or globals.css...

export function LoginModalContent() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setShowOtp(true);
  };

  const handleOtpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP code.');
      return;
    }
    setError('');
    alert('OTP submitted! (Demo only)');
  };

  return (
    <div className="login-content">
      {!showOtp ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn">Login</button>
          <div className="login-modal-actions">
            <button type="button" onClick={() => alert('TODO: Create account flow')}>Create account</button>
            <button type="button" onClick={() => alert('TODO: Forgot password flow')}>Forgot password?</button>
            <button type="button" onClick={() => setShowQr(!showQr)}>Setup 2FA</button>
          </div>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleOtpSubmit}>
          <label>
            Enter OTP Code
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn">Verify OTP</button>
          <div className="login-modal-actions">
            <button type="button" onClick={() => setShowOtp(false)}>Back to Login</button>
          </div>
        </form>
      )}
      {showQr && (
        <div className="login-qr">
          <h4>Google Authenticator Setup</h4>
          <img src="/icon-192x192.png" alt="QR Placeholder" />
          <div className="login-qr-secret">Secret code: <span>XXXX-XXXX</span></div>
          <div className="login-qr-info">
            Scan this QR with Google Authenticator app.<br />
            (Demo only, backend integration needed)
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModalContent;
