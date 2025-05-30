import React from "react";
// Icons
import { ShieldCheck, Zap, FileWarning } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section
      className="lp-section lp-problemsolution-section"
      id="problem-solution"
    >
      <div className="lp-container">
        <h2 className="lp-section-title">
          Tired of Slow, Manual Verification?
        </h2>
        <p className="lp-section-subtitle">
          Manual document checks are time-consuming, error-prone, and create
          frustrating delays for your users and your team. KlearDoc offers a
          smarter way.
        </p>
        <div className="lp-problemsolution-grid">
          <div className="lp-problemsolution-content">
            <FileWarning
              size={48}
              className="lp-feature-icon"
              style={{
                backgroundColor: "transparent",
                color: "#dc3545",
                width: "auto",
                height: "auto",
                marginBottom: "10px",
              }}
            />
            <h3>The Challenge: Outdated Processes</h3>
            <p>
              Traditional document verification involves manual data entry,
              visual checks, and lengthy turnaround times. This leads to high
              operational costs, increased risk of fraud, and poor customer
              experience.
            </p>
          </div>
          <div className="lp-problemsolution-content">
            <Zap
              size={48}
              className="lp-feature-icon"
              style={{
                backgroundColor: "transparent",
                width: "auto",
                height: "auto",
                marginBottom: "10px",
              }}
            />
            <h3>The KlearDoc Solution: Intelligent Automation</h3>
            <p>
              KlearDoc leverages advanced AI and machine learning to
              automatically extract data, verify authenticity, and perform
              facial recognition in seconds. Enhance security, reduce fraud, and
              onboard users faster than ever.
            </p>
            <a
              href="/verify"
              className="lp-button lp-button-primary"
              style={{ marginTop: "15px" }}
            >
              Get Started Free
            </a>
          </div>
          {/* Optional Image for this section
          <div className="lp-problemsolution-image">
            <img src="https://via.placeholder.com/500x350?text=Problem+vs+Solution+Visual" alt="Document Verification Challenges and Solutions" />
          </div>
          */}
        </div>
      </div>
    </section>
  );
};
export default ProblemSolutionSection;
