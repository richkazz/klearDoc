// src/pages/Contact.js
import React from 'react';
import '../styles/App.css'; // Or use a separate Contact.css if preferred

function Contact() {
  return (
    <div className="contact-container" id="contact">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">We’d love to hear from you! Fill out the form below and we’ll get in touch.</p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your Full Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your Email Address" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
