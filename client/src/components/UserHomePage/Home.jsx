import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import UriContext from "../ContextApi/UriContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { Button } from "react-bootstrap";


function HomePage() {
  const uri = useContext(UriContext);
  const role = localStorage.getItem("role");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

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

  const fetchAnnouncements = async () => {
    const response = await fetch(uri + "/announcements");
    const data = await response.json();
    setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchServices();
  }, [uri]);

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
            <Card 
              key={index} 
              title={announcement.title} 
              description={announcement.description} 
              image={announcement.announcementImage} 
              style={{height:'170px'}}
              />
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
