import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../VerifyPage.css';

function VerificationStatus({ status = "passed" }) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (status === "passed") {
      navigate('/token');
    } else {
      alert('Verification failed. Please try again.');
    }
  };

  return (
    <div className="verify-container">
      <h2>KYC Verification Status</h2>
      <p className={status === "passed" ? "status-pass" : "status-fail"}>
        {status === "passed" ? "KYC Passed" : "KYC Failed"}
      </p>
      <button onClick={handleNext}>
        {status === "passed" ? "View Token" : "Try Again"}
      </button>
    </div>
  );
}

export default VerificationStatus;
