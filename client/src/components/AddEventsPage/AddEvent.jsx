import React, { useContext, useState } from 'react'
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Button, Form, ToastContainer } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UriContext from '../ContextApi/UriContext';
import './AddEvent.css'

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
<div className="add-event-form-container">
  <form className="form-layout" onSubmit={handleSubmit}>
    <h2 className="form-heading">Add Event</h2>
    
    <div className="form-group">
      <input
        type="text"
        id="title"
        name="title"
        className="form-input"
        value={formValues.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
    </div>
    
    <div className="form-group">
      <textarea
        id="description"
        name="description"
        rows="4"
        className="form-input"
        value={formValues.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      />
    </div>
    
    <div className="form-group">
      <label className="form-label" htmlFor="serviceImage">Add Image</label>
      <div className="image-upload">
        <label htmlFor="serviceImage" className="image-placeholder">
          <img src="/placeholder-image.png" alt="Add Image" />
        </label>
        <input
          type="file"
          id="serviceImage"a
          name="serviceImage"
          onChange={handleInputChange}
          className="file-input"
        />
      </div>
    </div>
    
    <button 
      type="submit" 
      className="submit-button">
      Submit
    </button>
  </form>
  
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