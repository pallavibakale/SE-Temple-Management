import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import UriContext from "../ContextApi/UriContext";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import "./AddServices.css";
import { useNavigate } from "react-router-dom";

function AddServices() {
  const uri = useContext(UriContext);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [currentService, setCurrentService] = useState({
    title: "",
    serviceImage: null,
    description: "",
    cost: "",
  });

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

  const handleAddService = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", currentService.title);
    formData.append("serviceImage", currentService.serviceImage);
    formData.append("cost", currentService.cost);
    formData.append("description", currentService.description);

    try {
      const response = await fetch(uri + "/add-service", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Service added successfully");
        navigate("/services");
      } else {
        console.error("Error adding service:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    const response = await fetch(uri + `/services/${serviceId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchServices();
    } else {
      console.error("Failed to delete service:", await response.text());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      setCurrentService({ ...currentService, [name]: e.target.files[0] });
    } else {
      setCurrentService({ ...currentService, [name]: value });
    }
  };

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <main className="main-content">
      <Container className="add-service-form-container">
      <h2 className="form-heading">Add Pooja Services</h2>
      <Form className="form-layout" onSubmit={handleAddService}>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="title"
            value={currentService.title}
            required
            onChange={handleChange}
            placeholder="Title"
            className="form-input"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={currentService.description}
            placeholder="Description"
            required
            onChange={handleChange}
            className="form-input"
          />
        </Form.Group>


        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="cost"
            value={currentService.cost}
            onChange={handleChange}
            placeholder="Cost"
            required
            className="form-input"
          />
        </Form.Group>


        <Form.Group className="form-group">
          <Form.Label>Add Image</Form.Label>
          <div className="image-upload">
            <label htmlFor="serviceImage" className="image-placeholder">
              <img src="/placeholder-image.png" alt="Placeholder" />
            </label>
            <Form.Control
              type="file"
              id="serviceImage"
              name="serviceImage"
              onChange={handleChange}
              className="file-input"
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
      </main>
      <Footer />
    </div>
  );
}

export default AddServices;
