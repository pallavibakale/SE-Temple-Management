import React, { useState } from "react";
import "./styles/Home.css";
import "./styles/AboutUs.css";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const imgSrc=[
  {
    src: 'card-image.jpg',
  },
  {
    src: 'card-image.jpg',
  },
  {
    src: 'card-image.jpg'
  },
  {
    src: 'pic5.jpeg'
  },
  {
    src: 'pic4.jpeg'
  },
  {
    src: 'pic6.jpeg'
  },
  {
    src: 'pic3.jpeg'
  },
]

// AboutUsCard Component with Background Image
const AboutUsCard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <div className="about-bg-section">
            <div className="about-overlay" >
                <h1>About us</h1>
                <p>Discover the spiritual offerings and community events at our temple</p>
            </div>
      </div>
      <br/><br/>
      <h1 style={{color:'#FF7700',fontWeight:'700'}}>Gallery</h1>
      <br/><br/>
      <div className="gallery-section">
        {imgSrc.map((img, index) => (
              <img key={index} src={img.src} alt="missing"/>
          ))
        }
      </div>
      <br/><br/>
      <div style={{color: 'black', display:'flex', flexDirection:'column', alignItems:'center',margin:'25px 0 25px 0',padding:'25px 0 25px 0'}}>
        <h1 style={{color:'#FF7400 '}}> Support Our Temple</h1>
        <p className="support-description" style={{width:'700px',alignContent:'center',textAlign:'center'}}>Join us in preserving our sacred space and supporting our community by making a generous donation today. Every contribution makes a difference.</p>
        <Button href="/donate" style={{backgroundColor:'#FF7400',border:'none',outline:'none',borderRadius:'6px'}}>Donate Now</Button>
      </div>
          
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsCard;
