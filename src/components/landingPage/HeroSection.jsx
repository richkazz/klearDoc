import React from "react";
import { Link as RouterLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="lp-hero-section" id="hero">
      <div className="lp-container lp-hero-content">
        <h1>Automate Document Verification, Instantly.</h1>
        <p className="lp-hero-subheadline">
          KlearDoc streamlines your KYC, onboarding, and compliance processes
          with AI-powered document verification. Secure, fast, and reliable.
        </p>
        <div className="lp-hero-actions">
          <RouterLink to="/verify" className="lp-button lp-button-primary">
            Verify a Document Now
          </RouterLink>
          <a href="#features" className="lp-button lp-button-secondary">
            Learn More
          </a>
        </div>
        <div className="lp-hero-image-container">
          {/* Replace with a compelling image or product mockup */}
          <img src="/images/oop-1.jpg" alt="KlearDoc Platform" />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
