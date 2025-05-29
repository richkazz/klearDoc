import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your logic here
    navigate('/verify');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon"></div>
          <h2>KlearDoc</h2>
          <p className="auth-subtext">KlearDoc Document Verification Platform</p>

          <div className="auth-tabs">
            <button
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Full Name</label>
              <input type="text" placeholder="Full Name" required />
            </>
          )}

          <label>Email</label>
          <input type="email" placeholder="Email Address" required />

          <label>Password</label>
          <input type="password" placeholder="Password" required />

          <button className="submit-btn" type="submit">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
