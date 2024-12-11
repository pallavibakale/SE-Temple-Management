import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import UriContext from "../ContextApi/UriContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
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
          </button>
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


function HomePage() {
  const uri = useContext(UriContext);
  const role = localStorage.getItem("role");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  // const [announcements, setAnnouncements] = useState([]);

  // setAnnouncements(data)
  const fetchServices = async () => {
    if (role != "Priest") {
      try {
        const response = await fetch(uri + "/services");
        const data = await response.json();
        setServices(data);
        
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    else setServices([]);
  };

  useEffect(() => {
    // fetchAnnouncements();
    fetchServices();
  }, []);

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

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <div className="home-section">
            <div className="overlay" >
                <h1>Welcome to Our Temple</h1>
                <p>Discover peace and spirituality at Temple</p>
                <Button href="/services" style={{backgroundColor:'#FF7400',border:'none',outline:'none'}}>Explore More</Button>
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
        <br/><br/>
        {(role === "Priest" || role==="Admin") && (
          <>
            <Button href="/add-event" style={{backgroundColor:'#FF7400',border:'none',outline:'none',borderRadius:'6px', color:'white'}}>Add event to Annoucements</Button>
            <br/><br/>
            <Button href="/live-streaming" style={{backgroundColor:'#FF7400',border:'none',outline:'none',borderRadius:'6px', color:'white'}}>Start live streaming</Button>
          </>
        )}
        {(role !== "Priest" && role!=="Admin") && (
          <>
            <div className="rituals-section">
              <h2 className="section-title">Rituals and Pujas</h2>        
            </div>
            <br/>
            <div className="rituals-grid">
            {services.map((service, index) => (
              <Card key={index} title={service.title} description={service.description} image={service.serviceImage} />
            ))}
            </div>
          </>
        )}
        <br/>
      <Footer />
    </div>
  );
}

export default HomePage;
