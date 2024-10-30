import React, { useRef, useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Footer from "./Footer";
import Navigation from "./Navigation";
import "./styles/Home.css";
import "./styles/Services.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from "../images/omkaar.png";
import UriContext from './UriContext';
import { useNavigate } from 'react-router-dom';


function Services() {
    const uri = useContext(UriContext);
    const navigate = useNavigate();
    const scrollContainerRefHomams = useRef(null);
    const scrollContainerRefPoojas = useRef(null);
    const [selectedService, setSelectedService] = useState(null);
    const [services, setServices] = useState([]);
    
    const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };

    // Function to scroll left
    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    // Function to scroll right
    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        fetchServices();
      });
    
      const fetchServices = async () => {
        try {
          const response = await fetch(uri+'/services');
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };

    const handleClick = (service) => {
        setSelectedService(service);
    }

    const handleSchedule = () => {
        const role = localStorage.getItem('role');
        if(role === ''){
            navigate('/login');
        }else{
            navigate('/schedule-appointment')
        }
    }

    const homams = services.filter(service => service.category === 'Homam');
    const poojas = services.filter(service => service.category === 'Pooja');

    return (
        <div className="container">
            <img
                loading="lazy"
                src= {Banner}
                alt="Omkaar Temple banner"
                className="banner-image"
            />
            <Navigation onLogout={handleLogout}/>
            <main className="main-content">
                <Container fluid>
                    {selectedService ? (
                        <Row>
                            <Col className="Service-tab">
                                <h2 className="section-title">Services</h2>
                                <div className="services-desc">
                                    <h3 className='section-title'>{selectedService.title}</h3>
                                    <div style={{ textAlign: "center", padding: "0px" }}>
                                        <p>{selectedService.description}</p>
                                        <img src={selectedService.serviceImage} alt={selectedService.alt} className="service-image" />
                                        <div style={{padding: "20px"}}>
                                           <Button className="btn btn-primary" onClick={handleSchedule}>Schedule Appointment</Button>
                                        </div>
                                    </div> 
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col className="Service-tab">
                                <h2 className="section-title">Services</h2>
                                <div className="services-desc">
                                    <h3 className="service-title">"By Request" Services</h3>
                                    <p>The following "by request" services can be performed at either the Temple or at a location of the devotees choosing.</p>
                                    <p>Donation for services performed away from Temple site (e.g., Warsaw, IN): $201.00</p>
                                    <p>Donation for services performed at Temple listed below.</p>
                                    <p>Scheduling or Questions: <a href="/contact">Contact</a></p>
                                </div>
                            </Col>
                            <Col>
                                <h2 className='section-title'>Homams - 151$</h2>
                                <div className="scroll-container">
                                    <Button onClick={() => scrollLeft(scrollContainerRefHomams)} className="scroll-button left-button">&lt;</Button>
                                    <div className="horizontal-scroll" ref={scrollContainerRefHomams}>
                                        {homams.map((service, index) => (
                                            <div className="image-container" key={index}>
                                                <img src={service.serviceImage} alt={service.alt} className="service-image" onClick={() => handleClick(service)} />
                                                <p className="image-description">{service.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button onClick={() => scrollRight(scrollContainerRefHomams)} className="scroll-button right-button">&gt;</Button>
                                </div>
                            </Col>
                            <Col>
                                <h2 className='section-title'>Poojas</h2>
                                <div className="scroll-container">
                                    <Button onClick={() => scrollLeft(scrollContainerRefPoojas)} className="scroll-button left-button">&lt;</Button>
                                    <div className="horizontal-scroll" ref={scrollContainerRefPoojas}>
                                        {poojas.map((service, index) => (
                                            <div className="image-container" key={index}>
                                                <img src={service.serviceImage} alt={service.alt} className="service-image" onClick={() => handleClick(service)} />
                                                <p className="image-description">{service.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button onClick={() => scrollRight(scrollContainerRefPoojas)} className="scroll-button right-button">&gt;</Button>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default Services;
