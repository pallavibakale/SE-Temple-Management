import React from "react";
import "./styles/Home.css";
import "./styles/ContactUs.css"; // Ensure this CSS file is similar to LiveStreamCard.css and EducationCard.css
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Banner from "../images/omkaar.png";
//import BG from "../images/background.PNG";
import { useNavigate } from "react-router-dom";

const ContactUsCard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };
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
      {/* <img
        loading="lazy"
        src={BG}
        alt="Temple background"
        className="background-image"
      /> */}
      <div className="contact-us-section">
      <h1>Contact Us</h1>
      <div className="contact-us-card">
        <div className="contact-item">
          <h3>Facebook:</h3>
          <p>*Facebook Messenger is currently the most reliable way of contacting us.*</p>
          <a href="https://www.facebook.com/OmkaarTemple" className="contact-link">Omkaar Temple Facebook Page</a>
        </div>
        
        <div className="contact-item">
          <h3>Email:</h3>
          <p>*Please be advised that Facebook Messenger is currently the best method of contact.*</p>
          <a href="mailto:contact@omkaartemple.org" className="contact-link">contact@omkaartemple.org</a> (Limited Availability)
        </div>
        
        <div className="contact-item">
          <h3>Phone:</h3>
          <p>*Please be advised that Facebook Messenger is currently the best method of contact.*</p>
          <a href="tel:+12603021008" className="contact-link">260-302-1008</a> (Limited Availability)
        </div>
        
        <div className="contact-item">
          <h3>US Postal Address:</h3>
          <p>Omkaar Temple<br/>14745 Yellow River Road<br/>Fort Wayne, IN 46818</p>
          <a href="https://www.google.com/maps/search/?api=1&query=14745+Yellow+River+Road+Fort+Wayne+IN+46818" className="contact-link">Open in Google Maps</a>
        </div>
        
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
      </div>
    </main>
    <Footer />
    </div>
  );
}

export default ContactUsCard;
