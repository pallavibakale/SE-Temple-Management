import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import UriContext from "../ContextApi/UriContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { Button } from "react-bootstrap";

// Import images
import ritual1 from "../../images/ritual1.jpeg";
import ritual2 from "../../images/ritual2.jpeg";
import ritual3 from "../../images/ritual3.jpeg";
import Puja1 from "../../images/Puja1.jpeg";
import Puja2 from "../../images/Puja2.jpeg";
import Puja3 from "../../images/Puja3.jpeg";
import A1 from "../../images/A1.jpeg";
import A2 from "../../images/A2.jpeg";
import A3 from "../../images/A3.jpeg";

// Array of images for rituals and pujas
const imgSrc = [
  { src: ritual1 },
  { src: ritual2 },
  { src: ritual3 },
  { src: Puja1 },
  { src: Puja2 },
  { src: Puja3 },
];

// Array of announcements with images
const announcements = [
  {
    title: 'Diwali Night',
    description: 'Join us for the grand Diwali celebration with rituals, food, and cultural events. Everyone is welcome! Celebrate the festival of lights with us.',
    image: A2,
  },
  {
    title: 'Navratri Festival',
    description: 'Celebrate the nine nights of Navratri with us. Enjoy traditional dance, music, and rituals in honor of Goddess Durga.',
    image: A3,
  },
  {
    title: 'Ganesha Chaturthi',
    description: 'Participate in the grand Ganesha Chaturthi celebrations. Join us for prayers, rituals, and the immersion ceremony.',
    image: A1,
  }
];

const HomePage = () => {
  const uri = useContext(UriContext);
  const role = localStorage.getItem("role");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const response = await fetch(uri + "/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <div className="home-section">
        <div className="overlay">
          <h1>Welcome to Our Temple</h1>
          <p>Discover peace and spirituality at Temple</p>
          <Button href="/services">Explore More</Button>
        </div>
      </div>
      <br />
      <div className="announcements-section">
        <h2 className="section-title">Announcements</h2>
      </div>
      <br />
      <div className="announcements-list">
        {announcements.map((announcement, index) => (
          <Card
            key={index}
            title={announcement.title}
            description={announcement.description}
            image={announcement.image}
          />
        ))}
      </div>
      <br />
      <br />
      {role === "Priest" && (
        <>
          <Button href="/add-event" style={{ backgroundColor: '#FF7400', border: 'none', outline: 'none', borderRadius: '6px', color: 'white' }}>
            Add event to Announcements
          </Button>
          <br />
          <br />
          <Button href="/" style={{ backgroundColor: '#FF7400', border: 'none', outline: 'none', borderRadius: '6px', color: 'white' }}>
            Start live streaming
          </Button>
        </>
      )}
      {role !== "Priest" && (
        <>
          <div className="rituals-section">
            <h2 className="section-title">Rituals and Pujas</h2>
          </div>
          <br />
          <div className="rituals-grid">
            {services.map((service, index) => (
              <Card
                key={index}
                title={service.title}
                description={service.description}
                image={service.serviceImage}
              />
            ))}
          </div>
        </>
      )}
      <br />
      <Footer />
    </div>
  );
};

export default HomePage;
