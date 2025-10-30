import { useState } from 'react';
import './login.css'; // Import the global CSS file

export default function Login() {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setShowOtp(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP code.');
      return;
    }
    setError('');
    alert('OTP submitted! (Demo only)');
  };

  return (
    <>
      {showModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <button className="login-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <h2>Customer Login</h2>
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
                  <button type="button" onClick={() => setShowQr(true)}>Setup Google Authenticator</button>
                  <button type="button" onClick={() => alert('TODO: Send code to phone')}>Send code to phone</button>
                </div>
              </form>
            )}
            {showQr && (
              <div className="login-qr">
                <h4>Google Authenticator Setup</h4>
                {/* TODO: Replace with real QR code and secret */}
                <img src="/icon-192x192.png" alt="QR Placeholder" />
                <div className="login-qr-secret">Secret code: <span>XXXX-XXXX</span></div>
                <div className="login-qr-info">
                  Scan this QR with Google Authenticator app.<br />
                  (Demo only, backend integration needed)
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
