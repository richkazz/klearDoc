import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO
    navigate('/verify');
  };

  return (
    <div className="auth-container">
      <h2>Create KlearDoc  agenticAI Account</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate('/login')} className="auth-switch">Already have an account? Login</p>
      </form>
    </div>
  );
}

export default Signup;
