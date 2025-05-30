import React from "react";
import {
  Landmark,
  Building,
  ShieldAlert,
  Users,
  FileBadge,
} from "lucide-react";

const useCases = [
  {
    icon: <Landmark size={32} />,
    title: "Financial Services",
    description:
      "Streamline KYC/AML compliance, prevent fraud, and accelerate customer onboarding for banks and fintechs.",
  },
  {
    icon: <Building size={32} />,
    title: "HR & Recruitment",
    description:
      "Verify candidate identities and right-to-work documents quickly and efficiently.",
  },
  {
    icon: <FileBadge size={32} />,
    title: "Government Agencies",
    description:
      "Enhance security and efficiency in citizen identity verification for public services.",
  },
  {
    icon: <Users size={32} />,
    title: "Online Marketplaces",
    description:
      "Build trust and safety by verifying users on peer-to-peer platforms.",
  },
];

const UseCasesSection = () => {
  return (
    <section className="lp-section lp-usecases-section" id="usecases">
      <div className="lp-container">
        <h2 className="lp-section-title">
          Powering Verification Across Industries
        </h2>
        <p className="lp-section-subtitle">
          KlearDoc is trusted by organizations of all sizes to automate their
          identity verification needs.
        </p>
        <div className="lp-usecases-grid">
          {useCases.map((useCase, index) => (
            <div className="lp-usecase-item" key={index}>
              {useCase.icon}
              <h4>{useCase.title}</h4>
              <p>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default UseCasesSection;
