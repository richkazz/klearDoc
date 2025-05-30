import React from "react";
// You might want specific icons for each step
import { UploadCloud, Cpu, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: <UploadCloud size={36} />,
    title: "Upload Document",
    description:
      "User securely uploads their ID document and (optionally) a selfie via web or mobile.",
  },
  {
    number: 2,
    icon: <Cpu size={36} />,
    title: "AI Analysis",
    description:
      "KlearDoc's AI instantly extracts data, checks for tampering, and verifies authenticity.",
  },
  {
    number: 3,
    icon: <CheckCircle size={36} />,
    title: "Get Results",
    description:
      "Receive clear verification status and extracted data within seconds.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="lp-section lp-howitworks-section" id="howitworks">
      <div className="lp-container">
        <h2 className="lp-section-title">
          Simple Steps to Secure Verification
        </h2>
        <p className="lp-section-subtitle">
          Our process is designed for ease of use and rapid results.
        </p>
        <div className="lp-howitworks-steps">
          {steps.map((step) => (
            <div className="lp-howitworks-step" key={step.number}>
              <div className="lp-howitworks-step-number">{step.number}</div>
              {/* {step.icon} */}
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
