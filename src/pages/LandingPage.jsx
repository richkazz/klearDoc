// src/pages/LandingPage.jsx
import React, { useEffect } from "react";
import Navbar from "../components/landingPage/Navbar";
import HeroSection from "../components/landingPage/HeroSection";
import ProblemSolutionSection from "../components/landingPage/ProblemSolutionSection";
import FeaturesSection from "../components/landingPage/FeaturesSection";
import HowItWorksSection from "../components/landingPage/HowItWorksSection";
import UseCasesSection from "../components/landingPage/UseCasesSection";
import Footer from "../components/landingPage/Footer";
import "../LandingPage.css"; // Import the CSS

const LandingPage = () => {
  useEffect(() => {
    // Add a class to body for specific landing page styles if needed
    document.body.classList.add("landing-page-body");
    // Clean up class when component unmounts
    return () => {
      document.body.classList.remove("landing-page-body");
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
        {/* Potentially add a CTA section here before footer */}
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
