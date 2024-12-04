import React, { useContext, useState } from 'react'
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Button, Form, ToastContainer } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UriContext from '../ContextApi/UriContext';

const AddEvent = () => {
    const uri = useContext(UriContext);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
      title: "",
      description: "",
      image:"",
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        try {
          const response = await fetch(uri + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          });
          const data = await response.json();
        } catch (error) {
          toast.error("Failed to connect to the server" + error);
        }
        navigate("/");
      }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
  return (
    <div className="login-section">
    <Form className="login-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Event</h2>
      <Form.Group controlId="title" className="input-group">
        <Form.Control
          type="text"
          name="title"
          value={formValues.title}
          style={{
            width: '520px',
            height: '36px',
            paddingLeft: '15px',
            paddingRight: '12px',
            fontFamily: 'Inter',
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: '400',
            background: '#F3F4F6',
            borderRadius: '6px',
            borderWidth: '0px',
            outline: 'none',
            color: 'Black'
          }}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
      </Form.Group>
      <Form.Group controlId="password" className="input-group">
        <textarea
          type="text"
          name="description"
          rows="5"
          style={{
            width: '520px',
            // height: '36px',
            paddingLeft: '15px',
            paddingRight: '12px',
            fontFamily: 'Inter',
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: '400',
            background: '#F3F4F6',
            borderRadius: '6px',
            borderWidth: '0px',
            outline: 'none',
            color: 'black'
          }}
          value={formValues.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        
      </Form.Group>
      
      <Form.Group controlId="image" className="input-group">
        <Form.Control
          type="file"
          name="image"
          value={formValues.image}
          style={{
            width: '520px',
            height: '36px',
            paddingLeft: '15px',
            paddingRight: '12px',
            fontFamily: 'Inter',
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: '400',
            background: '#F3F4F6',
            borderRadius: '6px',
            borderWidth: '0px',
            outline: 'none',
            color: 'Black'
          }}
          onChange={handleInputChange}
          placeholder="Add image"
          required
        />
      </Form.Group>   
     

      <Button 
        type="submit" 
        className="btn-success"
        style={{
          width: '520px',
          height: '44px',
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter',
          fontSize: '16px',
          lineHeight: '26px',
          fontWeight: '400',
          color: '#FFFFFF',
          background: '#FF7400',
          opacity: 1,
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}>
        Submit
      </Button>
    </Form>
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
  )
}
const AddEventSection = () => (
    <div className="container text-center">
      <Navigation />
      <AddEvent />
      <Footer />
    </div>
  );
  
export default AddEventSection;
