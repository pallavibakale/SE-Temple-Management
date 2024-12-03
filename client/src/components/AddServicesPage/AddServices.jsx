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
    localStorage.setItem("role", "");
    navigate("/");
  };

  const [currentService, setCurrentService] = useState({
    title: "",
    serviceImage: null,
    alt: "",
    description: "",
    cost: "",
  });

  useEffect(() => {
    fetchServices();
  }, []); // Added dependency array to prevent infinite loop

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
    e.preventDefault(); // Prevent the default form submission behavior

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
        <Container fluid>
          <Form
            style={{ justifySelf: "center", height: "100%" }}
            onSubmit={handleAddService}
          >
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentService.title}
                required
                onChange={handleChange}
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentService.description}
                placeholder="Description"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                name="cost"
                value={currentService.cost}
                onChange={handleChange}
                placeholder="Cost"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="serviceImage"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default AddServices;
