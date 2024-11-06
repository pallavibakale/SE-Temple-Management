import React, { useRef, useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "./Footer";
import Navigation from "./Navigation";
import "./styles/Home.css";
import "./styles/Services.css";

import UriContext from "./UriContext";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";

function Services() {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };
  
  const serviceData=[
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
  ]

  // useEffect(() => {
  //   fetchServices();
  // });

  // const fetchServices = async () => {
  //   try {
  //     const response = await fetch(uri + "/services");
  //     const data = await response.json();
  //     setServices(data);
  //   } catch (error) {
  //     console.error("Error fetching services:", error);
  //   }
  // };

  // const handleClick = (service) => {
  //   setSelectedService(service);
  // };

  const handleSchedule = () => {
    const role = localStorage.getItem("role");
    if (role === "") {
      navigate("/login");
    } else {
      navigate("/schedule-appointment");
    }
  };

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
        <div className="service-container">
          {
            serviceData.map((service,index)=>(
              <ServiceCard key={index} title={service.title} description={service.description} image={service.image} />
            ))
          }
        </div>
      <Footer />
    </div>
  );
}

export default Services;
