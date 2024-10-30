import React, { useState } from "react";
import "./styles/Home.css";
import "./styles/AboutUs.css";
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Banner from "../images/omkaar.png";
import { useNavigate } from "react-router-dom";

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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };

  return (
    <div className="container">
      {/* Banner */}
      <img
        loading="lazy"
        src={Banner}
        alt="Omkaar Temple banner"
        className="banner-image"
      />
      {/* Navigation */}
      <Navigation onLogout={handleLogout}/>
      <main className="main-content">
        <div className="about-us-card">
          {/* About Us Content */}
          <h1>Welcome to Omkaar Temple</h1>
          <p>
            Omkaar, the inaugural Hindu temple in North America named after the sacred Aum mantra,
            will house the Pancha Mukha Shiva Linga as its primary deity. This profound symbol
            reflects the vastness of the universe, embodying all creation, life, and existence
            in its entirety. The Pancha Mukha Shiva Linga, representing universal unity in all
            directions, will be revered alongside other deities who hold a cherished place in
            Hindu worship. These include Parvathy (Ambaal), Ganapathi, Murugan, Balaji (Perumal),
            Padmavathi, Lakshmi, Sriram Parivar, Hanuman, Krishna, Radha, and the Nava Grahas.
            Together, they encapsulate the rich tapestry of divine forms in Hindu tradition.
          </p>
          {/* Accordions */}
          <Accordion
            title="Our Mission"
            content="Omkaar Temple is dedicated to creating a sacred space in Fort Wayne, IN, where the
            Hindu community can engage in worship, celebrate rituals, and immerse themselves
            in the rich tapestry of Hindu culture and philosophy. The temple will serve as a
            beacon for those seeking knowledge and spiritual growth through the diverse aspects
            of Hindu teachings, including yoga, education, and philosophy."
          />
          <Accordion
            title="Our Vision"
            content="Our vision is to erect a temple that not only stands as a house of worship but also
            embodies the spiritual unity of the Universe through the installation of the Pancha
            Mukha Shiva Linga and Sri Venkateshwara. These deities, along with others such as
            Raja Ganapathi, Murugan, Parvathi, and the Nava Grahas, will be venerated in a setting
            that reflects their divine stature, ensuring all deities receive equal reverence as
            per Hindu tradition."
          />
          <Accordion
            title="Our Purpose"
            content="The temple aims to foster a deeper understanding across different faiths and cultures,
            promoting a spirit of communal harmony and support for humanitarian endeavors. Omkaar
            Temple will be a place where spiritual fulfillment is intertwined with cultural and
            social enrichment, enhancing the well-being of our community and beyond."
          />
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutUsCard;
