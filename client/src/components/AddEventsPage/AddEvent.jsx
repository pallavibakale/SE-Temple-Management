import React, { useContext, useState } from 'react'
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import {  ToastContainer } from 'react-bootstrap';
// import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UriContext from '../ContextApi/UriContext';
import './AddEvent.css'

const AddEvent = () => {
    const uri = useContext(UriContext);
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState({
      title: "",
      description: "",
      announcementImage:null,
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', announcement.title);
      formData.append('description', announcement.description);
      if (announcement.announcementImage) {
        formData.append('announcementImage', announcement.announcementImage);
      }
  
      try {
        const response = await fetch(uri + "/add-announcement", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        if (response.ok) {
          toast.success("Announcement added successfully!");
          navigate("/");
        } else {
          toast.error("Failed to add announcement: " + data.message);
        }
      } catch (error) {
        toast.error("Failed to connect to the server: " + error.message);
      }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // setFormValues({ ...formValues, [name]: value });

        if (e.target.type === "file") {
          setAnnouncement({ ...announcement, [name]: e.target.files[0] });
        } else {
          setAnnouncement({ ...announcement, [name]: value });
        }
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
        value={announcement.title}
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
        value={announcement.description}
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
          id="announcementImage"a
          name="announcementImage"
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