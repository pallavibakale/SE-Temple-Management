import React, { useState } from "react";
import "./styles/Home.css";
import "./styles/AboutUs.css";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// Accordion Component
const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

// AboutUsCard Component with Background Image
const AboutUsCard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <div className="about-bg-section">
            <div className="overlay" >
                <h1>About us</h1>
                <p>Discover the spiritual offerings and community events at our temple</p>
            </div>
      </div>
      <h1>Gallery</h1>
          
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsCard;
