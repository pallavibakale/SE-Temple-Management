import React, { useState, useContext,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Banner from "../images/omkaar.png";
import "./styles/Appointment.css";
import UriContext from './UriContext';
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  const empId = localStorage.getItem('id');
  const [formValues, setFormValues] = useState({
    empId: empId,
    firstName: "",
    title: "",
    date: "",
    email: "",
    phone: "",
    address: "",
    priest: "",
    priestId: "",
    status: "pending"
  });
  const [formErrors, setFormErrors] = useState({})
  const [priests, setPriests] = useState([])

  useEffect(() => {
    fetchPriests();
  });

  const fetchPriests = async () => {
    try {
      const response = await fetch(uri + '/get-priests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: 'Priest' })  // Ensure this matches server expectations
      });
      if (response.ok) {
        const data = await response.json(); // Corrected await
        setPriests(data); // Assume data is an array of priest objects
      } else {
        alert('Failed to fetch priests');
      }
    } catch (error) {
      console.error('Error fetching priests:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(uri+'/book-appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        });
        if (response.ok) {
          navigate('/appointments');
          // Optionally, you can redirect or show a success message here
        } else {
          console.error('Failed to book:', response.statusText);
          toast.error('Failed to book. Please try again.');
        }
      } catch (error) {
        console.error('Error booking:', error);
        toast.error('Error booking. Please try again later.');
      }
    } else {
      setFormErrors(errors);
      Object.values(errors).forEach(error => {
        toast.error(error);
      });
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'priest') {
      const val = value.split('-');
      setFormValues(prev => ({
        ...prev,
        priest: val[0],  // Set priest name
        priestId: val[1] // Set priest ID
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  

  const validateForm = () => {
    let errors = {};
    if (!formValues.firstName.match(/^[a-zA-Z\s]+$/)) {
      errors.firstName = "First name must not include numbers";
    }
    if (!formValues.title.match(/^[a-zA-Z\s]+$/)) {
      errors.title = "Title must not include numbers";
    }
    if (!formValues.email.includes('@')) {
      errors.email = "Email must include '@' character";
    }
    if (!formValues.phone.match(/^\+\d{1,2}-?\d{10}$/)) {
      errors.phone = "Phone number must include country code and be 10 digits";
    }
    if (!formValues.priest) {
        formErrors.issue = 'Select Priest is required';
      }
    return errors;
  };

  return (
    
    <div className="book-section">
      <Form className="book-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Appointment</h2>
        <Form.Group controlId="firstName">
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
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            placeholder="Service Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleInputChange}
            placeholder="Date"
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
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
        <Form.Group controlId="phone">
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
        <Form.Group controlId="priest">
          <Form.Label>Priest:</Form.Label>
          <Form.Control
                as="select"
                name="priest"
                value={formValues.priest}
                onChange={handleInputChange}
              >
                <option>Select Priest Name</option>
                {priests.map((priest) => (
                  <option key={priest._id}>
                    {priest.firstName} {priest.lastName}-{priest.empId}
                  </option>
                ))}
              </Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
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
        <Button variant="success" type="submit" className="submit-btn">
          Book Appointment
        </Button>
      </Form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

const AppointmentForm = () => {
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
    <Appointment />
    <Footer />
  </div>
)
}

export default AppointmentForm;
