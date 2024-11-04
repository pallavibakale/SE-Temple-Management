import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
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
