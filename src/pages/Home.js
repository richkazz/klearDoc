import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero"> 
   
       <div className="auth-icon"></div>
      <h1>KlearDoc Automated Document Verification</h1>
      <p>Upload and verify your documents in seconds. Fast, reliable, and secure verification powered by KlearDoc agenticAI.</p>
      <button onClick={() => navigate('/verify')}>Verify Document Now</button>
    </div>
  );
}

export default Home;
