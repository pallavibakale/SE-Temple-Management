import React from "react";
import "./Footer.css";

const NewsletterSignup = () => (
  <div className="newsletter-signup">
    <div className="newsletter-signup-header">
      <div className="newsletter-signup-title">
        Sign up for Newsletter :
      </div>
    </div>
    <form className="newsletter-signup-form">
      <input
        type="email" id="email" placeholder="&#9993; Enter Your Email" className="newsletter-signup-input" required aria-required="true" />
      <button type="submit" className="newsletter-signup-button">
        Subscribe
      </button>
    </form>
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h2> Temple Management</h2>
        <NewsletterSignup />
        &copy; 2024 TMS, Inc. All rights reserved
        <ul className="footer-list">
          <li>Privacy</li>
          <li>Terms</li>
          <li>Sitemap</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
