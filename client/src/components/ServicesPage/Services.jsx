import React, { useRef, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
// import "./styles/Home.css";
import "./Services.css";

import UriContext from "../ContextApi/UriContext";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";

function Services() {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(uri + "/services");
      const data = await response.json();
      setServices(data);
      
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <h2 className="service-title">Puja Services</h2>
        <div className="service-container">
          {
            services.map((service,index)=>(
              <ServiceCard key={index} title={service.title} description={service.description} cost={service.cost} image={service.serviceImage}
                style={{height:'250px'}}
               />
            ))
          }
        </div>
        <Button href="/admin-service" style={{textAlign:'center', background: 'rgb(255, 116, 0)', border: 'none'}}>Add Services</Button>
      <Footer />
    </div>
  );
}

export default Services;
