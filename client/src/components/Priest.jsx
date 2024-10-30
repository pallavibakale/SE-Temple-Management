import React from "react";
import "./styles/Home.css";
import "./styles/Priest.css"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Navigation from "./Navigation";
import PriestImage from "../images/Priest.jpeg"; 
import Banner from "../images/omkaar.png";
import { useNavigate } from "react-router-dom";
const PriestCard = () => {
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
        <div className="priest-section">
        <h1>Priest</h1>
          <div className="priest-card">
            <img
              loading="lazy"
              src={PriestImage}
              alt="Priest Sri Keshava Kaidala Sampath Kumar"
              className="priest-image"
            />
            <div className="priest-info">
              <h2>Priest Sri Keshava Kaidala Sampath Kumar</h2>
              <p>Priest Sri Keshava Kaidala Sampath Kumar joined Omkaar Temple on January 1st, 2021.</p>
              <p>Priest Keshava is fluent in Telugu, Kannada, Tamil, and English.</p>
              <a href="/special-services" className="special-services-link" style={{color: 'blue'}}>Special "by request" services available</a>
            </div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PriestCard;