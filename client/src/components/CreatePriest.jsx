import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Banner from "../images/omkaar.png";
import "./styles/Signup.css";
import UriContext from './UriContext';
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const uri = useContext(UriContext);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    empId: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(uri+'/create-priest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...formValues, empId: undefined}) // ensure empId is not sent from the client
        });
        if (response.ok) {
          const data = await response.json();
          toast.success(`Signed up successfully. Your Employee ID is ${data.empId}.`); // Display empId to the user
        } else {
          console.error('Failed to sign up:', response.statusText);
          toast.error('Failed to sign up. Please try again.');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        toast.error('Error signing up. Please try again later.');
      }
    } else {
      Object.values(errors).forEach(error => {
        toast.error(error);
      });
    }
};
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formValues.firstName.match(/^[a-zA-Z]+$/)) {
      errors.firstName = "First name must not include numbers";
    }
    if (!formValues.lastName.match(/^[a-zA-Z]+$/)) {
      errors.lastName = "Last name must not include numbers";
    }
    if (!formValues.email.includes('@')) {
      errors.email = "Email must include '@' character";
    }
    if (!formValues.phone.match(/^\+\d{1,2}-?\d{10}$/)) {
      errors.phone = "Phone number must include country code and be 10 digits";
    }
    if (!formValues.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)) {
      errors.password = "Password must be at least 8 characters, include a number, uppercase, lowercase, and special character";
    }
    return errors;
  };

  return (
    <div className="signup-section">
      <Form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Priest</h2>
        <Form.Group controlId="firstName" className="form-fields">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName" className="form-fields">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="form-fields">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group controlId="phone" className="form-fields">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="form-fields">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="address" className="form-fields">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            placeholder="Address"
            rows={3}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Create Priest
        </Button>
      </Form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

const CreatePriest = () =>{
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };
  return (
  <div className="container text-center">
    <img
      loading="lazy"
      src={Banner}
      alt="Omkaar Temple banner"
      className="banner-image"
    />
    <Navigation onLogout={handleLogout}/>
    <SignUpForm />
    <Footer />
  </div>
);
}

export default CreatePriest;
