import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Linkedin, Twitter, Facebook } from "lucide-react"; // Example social icons

const Footer = () => {
  return (
    <footer className="lp-footer">
      <div className="lp-container lp-footer-content">
        <RouterLink to="/" className="lp-footer-logo">
          <img src="/images/kleardoc-logo7.png" alt="KlearDoc Logo" />
        </RouterLink>
        <div className="lp-footer-links">
          <RouterLink to="/about">About Us</RouterLink>
          <RouterLink to="/services">Services</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
          <RouterLink to="/terms-of-service">Terms of Service</RouterLink>
        </div>
        <div className="lp-footer-social">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={20} />
          </a>
        </div>
        <p className="lp-footer-copyright">
          © {new Date().getFullYear()} KlearDoc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
