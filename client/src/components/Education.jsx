import React from "react";
import "./styles/Home.css";
import "./styles/Education.css"; // Ensure this CSS file is similar to LiveStreamCard.css
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Navigation from "./Navigation";
import Banner from "../images/omkaar.png";
//import BG from "../images/background.PNG";
import { useNavigate } from "react-router-dom";

const EducationCard = () => {
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
    <div className="education-section">
      <h1>Education</h1>
      <div className="education-card">
        <h2>Journalists, Educators, and Curious Minds</h2>
        <p>Our doors are always open to journalists, educators, and curious minds who would like to learn more about Hinduism, our culture, and our sacred ceremonies. We also welcome field trips of all ages for teachers and their students. Please come visit the Temple to watch Hindu Poojas (ceremonial prayers) and learn about our religion. Dress code is casual, however we ask that visitors dress appropriately by not wearing clothes that are overtly revealing. Specifically, knee level or below and covering of the shoulders and chest.</p>
        <p>Our timings and ceremonies are constantly changing so we ask that larger groups and those traveling greater distances contact us ahead of time to confirm we will be open upon arrival.</p>
        <h2>Lessons About Hinduism</h2>
        <p>Educational content to come soon to this page. Check back often!</p>
        <p>As you explore our website you might see links on certain Hindu words. Click on them to learn more about Hinduism. These links take you off our site however, so please be careful. External links are marked with their destinations in parenthesis ().</p>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
    </main>
    <Footer />
    </div>
  );
}

export default EducationCard;
