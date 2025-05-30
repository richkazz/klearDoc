import React from "react";
import { Zap, ShieldCheck, Users, DatabaseZap, ScanFace } from "lucide-react"; // Import necessary icons

const features = [
  {
    icon: <Zap />,
    title: "Instant Verification",
    description:
      "Verify documents in real-time, reducing onboarding times from days to seconds.",
  },
  {
    icon: <ShieldCheck />,
    title: "Bank-Grade Security",
    description:
      "Protect sensitive data with end-to-end encryption and robust security protocols.",
  },
  {
    icon: <DatabaseZap />,
    title: "AI-Powered Accuracy",
    description:
      "Leverage cutting-edge AI for precise data extraction and forgery detection.",
  },
  {
    icon: <ScanFace />,
    title: "Facial Recognition",
    description:
      "Advanced biometric checks to confirm user identity against document photos.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="lp-section lp-features-section" id="features">
      <div className="lp-container">
        <h2 className="lp-section-title">Why Choose KlearDoc?</h2>
        <p className="lp-section-subtitle">
          Empower your business with features designed for speed, security, and
          scalability.
        </p>
        <div className="lp-features-grid">
          {features.map((feature, index) => (
            <div className="lp-feature-card" key={index}>
              <div className="lp-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
