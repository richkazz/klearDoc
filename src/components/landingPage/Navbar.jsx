import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className={`lp-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="lp-container lp-navbar-container">
          <RouterLink to="/" className="lp-logo" onClick={handleLinkClick}>
            <img src="/images/kleardoc-logo7.png" alt="KlearDoc Logo" />
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="lp-nav-links lp-nav-desktop">
            <a href="#features">Features</a>
            <a href="#howitworks">How It Works</a>
            <a href="#usecases">Use Cases</a>
            <RouterLink
              to="/verify"
              className="lp-button lp-button-primary"
              style={{ color: "white" }}
            >
              Verify Document
            </RouterLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lp-mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lp-nav-mobile ${mobileMenuOpen ? "open" : ""}`}>
          <div className="lp-nav-mobile-content">
            <a href="#features" onClick={handleLinkClick}>
              Features
            </a>
            <a href="#howitworks" onClick={handleLinkClick}>
              How It Works
            </a>
            <a href="#usecases" onClick={handleLinkClick}>
              Use Cases
            </a>
            <RouterLink
              to="/verify"
              className="lp-button lp-button-primary lp-mobile-cta"
              onClick={handleLinkClick}
            >
              Verify Document
            </RouterLink>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lp-mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        /* Base navbar styles */
        .lp-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .lp-navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .lp-navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .lp-logo img {
          height: 40px;
          width: auto;
        }

        /* Desktop Navigation */
        .lp-nav-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .lp-nav-desktop a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .lp-nav-desktop a:hover {
          color: #007bff;
        }

        .lp-nav-desktop a:not(.lp-button)::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #007bff;
          transition: width 0.3s ease;
        }

        .lp-nav-desktop a:not(.lp-button):hover::after {
          width: 100%;
        }

        .lp-button {
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .lp-button-primary {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
        }

        .lp-button-primary:hover {
          background: linear-gradient(135deg, #0056b3, #004085);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 123, 255, 0.3);
        }

        /* Mobile Menu Toggle Button */
        .lp-mobile-menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 30px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .hamburger-line {
          width: 100%;
          height: 3px;
          background: #333;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-line.active:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .hamburger-line.active:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.active:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        /* Mobile Navigation */
        .lp-nav-mobile {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100vh;
          background: white;
          box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
          transition: right 0.3s ease;
          z-index: 999;
          padding-top: 80px;
        }

        .lp-nav-mobile.open {
          right: 0;
        }

        .lp-nav-mobile-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .lp-nav-mobile-content a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #eee;
          transition: color 0.3s ease;
        }

        .lp-nav-mobile-content a:hover {
          color: #007bff;
        }

        .lp-mobile-cta {
          margin-top: 1rem;
          text-align: center;
          border-bottom: none !important;
        }

        /* Mobile Overlay */
        .lp-mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .lp-navbar-container {
            padding: 1rem;
          }

          .lp-nav-desktop {
            display: none;
          }

          .lp-mobile-menu-toggle {
            display: flex;
          }

          .lp-logo img {
            height: 35px;
          }
        }

        @media (max-width: 480px) {
          .lp-nav-mobile {
            width: 100%;
            right: -100%;
          }

          .lp-nav-mobile.open {
            right: 0;
          }
        }

        /* Tablet adjustments */
        @media (max-width: 992px) and (min-width: 769px) {
          .lp-nav-desktop {
            gap: 1.5rem;
          }

          .lp-navbar-container {
            padding: 1rem 1.5rem;
          }
        }

        /* Large screen adjustments */
        @media (min-width: 1200px) {
          .lp-navbar-container {
            padding: 1rem 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
