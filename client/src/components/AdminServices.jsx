import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import UriContext from './UriContext';
import Service from "./Service";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Banner from "../images/omkaar.png";
import "./styles/Home.css";
import "./styles/Services.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AdminServices() {
  const uri = useContext(UriContext);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
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


  const handleAddService = async (service) => {

    const formData = new FormData();
    formData.append('title', service.title);
    formData.append('serviceImage', service.serviceImage); // Assuming this is a file
    formData.append('alt', service.alt);
    formData.append('description', service.description);
    formData.append('category', service.category);
    const response = await fetch(uri + '/add-service', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      fetchServices(); // Refresh the list
    }
  };

  const handleEditService = async (service) => {

    const formData = new FormData();
    formData.append('title', service.title);
    formData.append('serviceImage', service.serviceImage); // Assuming this is a file
    formData.append('alt', service.alt);
    formData.append('description', service.description);
    formData.append('category', service.category);


    const response = await fetch(uri + `/services/${service._id}`, {
      method: 'PUT',
      body: formData
    });
    if (response.ok) {
      fetchServices(); // Refresh the list
    }
  };

  const handleDeleteService = async (serviceId) => {

    const response = await fetch(uri+`/services/${serviceId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      fetchServices(); // Refresh the list after deletion
    } else {
      console.error('Failed to delete service:', await response.text());
    }
  };

  const homams = services.filter(service => service.category === 'Homam');
  const poojas = services.filter(service => service.category === 'Pooja');


  return (
    <div className="container">
      <img
        loading="lazy"
        src={Banner}
        alt="Omkaar Temple banner"
        className="banner-image"
      />
      <Navigation onLogout={handleLogout}/>
      <main className="main-content">
        <Container fluid>
          <div>
            <h2 className="section-title">Services</h2>
            <div>
              <h3 className='section-title'>Homams</h3>
              <Service services={homams} onAdd={handleAddService} onEdit={handleEditService} onDelete={handleDeleteService} category="Homam" />
            </div>
            <div>
              <h3 className='section-title'>Poojas</h3>
              <Service services={poojas} onAdd={handleAddService} onEdit={handleEditService} onDelete={handleDeleteService} category="Pooja" />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default AdminServices;

