// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-text">
          <h1>KlearDoc Automated Document Verification</h1>
          <p>
            Upload and verify your documents in seconds. Fast, reliable, and secure verification powered by KlearDoc agenticAI.
          </p>
          <button onClick={() => navigate('/verify')} className="verify-button">
            Verify Document Now
          </button>
          
        </div>

        <div className="hero-image">
          <img src="/images/oop-1.jpg" alt="Document Icon" className="verify-icon" />
        </div>
      </div>

    </div>
  );
}

export default Home;
