import React from 'react';
import '../styles/App.css'; 

function Services() {
  return (
    <div className="services-container" id="services">
      <h2 className="services-title">Our Services</h2>
      <p className="services-subtitle">Streamlining document verification with cutting-edge technology</p>

      <div className="services-grid">
        <div className="service-card">
          <h3>Document Upload</h3>
          <p>Securely upload documents in various formats (PDF, DOCX, images) with instant preview support.</p>
        </div>

        <div className="service-card">
          <h3>Automated Verification</h3>
          <p>Verify documents in real-time using AI-powered validation tools trained on industry standards.</p>
        </div>

        <div className="service-card">
          <h3>Fraud Detection</h3>
          <p>Advanced fraud detection algorithms that identify forged or tampered documents.</p>
        </div>

        <div className="service-card">
          <h3>Audit & Tracking</h3>
          <p>Detailed logs and audit trails to track document history and verification outcomes.</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
