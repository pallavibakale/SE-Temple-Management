import React, { useState, useEffect, useContext } from "react";
import "./styles/Home.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import UriContext from "./UriContext";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { Button } from "react-bootstrap";

const AnnouncementItem = ({ title, description, expanded, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className="announcement-item">
      <div className="announcement-title">{title}</div>
      {expanded && (
        <div className="announcement-description">{description}</div>
      )}
      {!expanded && (
        <div className="announcement-expand">
          <button className="announcement-expand-text" onClick={handleClick}>
            &#9660;
          </button>{" "}
          {/* Down arrow symbol */}
        </div>
      )}
    </div>
  );
};



const announcements = [
  {
      title: 'Diwali Night',
      description: 'Join us for the grand Diwali celebration with rituals, food, and cultural events. Everyone is welcome! Celebrate the festival of lights with us.',
      image: 'card-image.jpg',
  },
  {
      title: 'Navratri Festival',
      description: 'Celebrate the nine nights of Navratri with us. Enjoy traditional dance, music, and rituals in honor of Goddess Durga.',
      image: 'card-image.jpg',
  },
  {
      title: 'Ganesha Chaturthi',
      description: 'Participate in the grand Ganesha Chaturthi celebrations. Join us for prayers, rituals, and the immersion ceremony.',
      image: 'card-image.jpg',
  }
];

const rituals = [
  {
      title: 'Ganesh Puja',
      description: 'Ganesh Puja is performed to remove obstacles and bring prosperity.',
      image: 'card-image.jpg',
  },
  {
      title: 'Durga Puja',
      description: 'Durga Puja, celebrating the goddess Durga, is a major festival in India.',
      image: 'card-image.jpg',
  },
  {
      title: 'Lakshmi Puja',
      description: 'Lakshmi Puja is performed to seek blessings for wealth and prosperity.',
      image: 'card-image.jpg',
  },
  {
      title: 'Saraswati Puja',
      description: 'Saraswati Puja is dedicated to the goddess of knowledge, Saraswati.',
      image: 'card-image.jpg',
  },
  {
      title: 'Shiva Puja',
      description: 'Shiva Puja is performed to honor Lord Shiva and seek his blessings.',
      image: 'card-image.jpg',
  },
  {
      title: 'Vishnu Puja',
      description: 'Vishnu Puja is conducted to seek the protection and blessings of Lord Vishnu.',
      image: 'card-image.jpg',
  }
];

function HomePage() {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  // const [announcements, setAnnouncements] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(0);

  // setAnnouncements(data)

  useEffect(() => {
    // fetchAnnouncements();
  });

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };

  // const fetchAnnouncements = async () => {
  //   const response = await fetch(uri + "/announcements");
  //   const data = await response.json();
  //   setAnnouncements(data);
  // };

  // const handleExpand = (index) => {
  //   if (index === expandedIndex) {
  //     setExpandedIndex(-1); // Collapse the clicked announcement if it's already expanded
  //   } else {
  //     setExpandedIndex(index); // Expand the clicked announcement
  //   }
  // };

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <div className="home-section">
            <div className="overlay" >
                <h1>Welcome to Our Temple</h1>
                <p>Discover peace and spirituality at Temple</p>
                <Button style={{backgroundColor:'#FF7400',border:'none',outline:'none'}}> Explore More</Button>
            </div>
        </div>
        <br/><br/>
        <div className="announcements-section">
          <h2 className="section-title">Announcements</h2>   
        </div>  
        <br/>  
        <div className="announcements-list">
          {announcements.map((announcement, index) => (
            <Card key={index} title={announcement.title} description={announcement.description} image={announcement.image} />
          ))}
        </div>
        <br/><br/><br/>
        <div className="rituals-section">
          <h2 className="section-title">Rituals and Pujas</h2>        
        </div>
        <br/>
        <div className="rituals-grid">
          {rituals.map((ritual, index) => (
            <Card key={index} title={ritual.title} description={ritual.description} image={ritual.image} />
          ))}
        </div>
        <br/>
      <Footer />
    </div>
  );
}

export default HomePage;
