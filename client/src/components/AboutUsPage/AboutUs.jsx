import React from "react";
import "./AboutUs.css";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// Import images
import pic1 from "../../images/pic1.jpeg";
import pic2 from "../../images/pic2.jpeg";
import pic4 from "../../images/pic4.jpeg";
import pic5 from "../../images/pic5.jpeg";
import pic7 from "../../images/pic7.jpeg";

// Array of images
const imgSrc = [
  { src: pic1 },
  { src: pic2 },
  { src: pic4 },
  { src: pic5 },
  { src: pic7 },
];

const AboutUsCard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

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
        <div className="about-overlay">
          <h1>About us</h1>
          <p>Discover the spiritual offerings and community events at our temple</p>
        </div>
      </div>
      <br />
      <br />
      <h1 style={{ color: "#FF7700", fontWeight: "700" }}>Gallery</h1>
      <br />
      <br />
      <div className="gallery-section">
        {imgSrc.map((img, index) => (
          <img key={index} src={img.src} alt={`Gallery ${index + 1}`} />
        ))}
      </div>
      <br />
      <br />
      {role !== "Priest" && (
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "25px 0",
            padding: "25px 0",
          }}
        >
          <h1 style={{ color: "#FF7400" }}>Support Our Temple</h1>
          <p
            className="support-description"
            style={{
              width: "700px",
              textAlign: "center",
            }}
          >
            Join us in preserving our sacred space and supporting our community
            by making a generous donation today. Every contribution makes a
            difference.
          </p>
          <Button
            href="/donate"
            style={{
              backgroundColor: "#FF7400",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Donate Now
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AboutUsCard;
