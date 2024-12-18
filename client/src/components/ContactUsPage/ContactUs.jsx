import React, { useState } from "react";
// import "./styles/Home.css";
import "./ContactUs.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ContactUsCard = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    // State for form values
    name: "",
    email: "",
    question: "",
    })
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {}
  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <main className="main-content">
        <div className="contact-us-section">
            <div className="contact-item">
              <h1 className="form-heading" >Contact Us</h1>
              <Form className="contact-form" onSubmit={handleSubmit}  >
                <Form.Group controlId="name" className="form-fields">
                  <Form.Label > Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="form-fields">
                  <Form.Label >Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className="input"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="&#9993;  Enter Your Email"
                    required
                />
                </Form.Group>
                <Form.Group controlId="question" className="form-textarea">
                  <Form.Label >Question:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="question"
                    className="input"
                    value={formValues.question}
                    onChange={handleInputChange}
                    placeholder="Ask me question...."
                    rows={3}
                  />
                </Form.Group>
                <br/>

                <Button type="submit" id="custom-submit-btn ">
                  Submit
                </Button>

              </Form>
            </div>

            <div className="contact-item">
              <iframe id="mapC" src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d116096.61185683029!2d-85.44151264024133!3d41.11836115405251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d41.118829399999996!2d-85.33625479999999!4m5!1s0x8815de98058d4389%3A0xbacc97d8d7f4dbaa!2s14745%20Yellow%20River%20Rd%2C%20Fort%20Wayne%2C%20IN%2046818!3m2!1d41.117633999999995!2d-85.333675!5e0!3m2!1sen!2sus!4v1730770283478!5m2!1sen!2sus" 
              className="map"
              style={{border:"0", allowfullscreen:"" ,loading:"lazy", referrerpolicy:"no-referrer-when-downgrade"}}></iframe>           
            </div>

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default ContactUsCard;
