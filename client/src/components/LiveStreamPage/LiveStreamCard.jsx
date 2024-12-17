import React from "react";
// import "./styles/Home.css";
import "./LiveStreamCard.css"; // Ensure proper styles are defined in this CSS file
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import { useNavigate } from "react-router-dom";
//import BG from "../images/background.PNG";

const LiveStreamCard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.setItem("role", "");
    localStorage.removeItem("empId");
    navigate("/");
  };
  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <main className="main-content">
        <div
          className="live-stream-card"
          style={{ backgroundColor: "#FFF7F0", padding: "60px" }}
        >
          <h1 style={{ marginLeft: "45px" }}>Join Our Next Live Stream!</h1>
          <br />
          <p>
            Our next livestream is scheduled for 6pm on February 26th, 2025
            (Maha Shiva Ratri).
          </p>
          <div>
            <p>
              The channels listed below will be streaming live during the
              scheduled event:
            </p>
            <ul>
              <li>
                <a
                  href="https://facebook.com/yourliveevent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stream-link"
                >
                  Facebook live
                </a>
              </li>
            </ul>
          </div>
          <p>
            Celebrate, honor, and learn about Hinduism as we open our doors and
            invite the world to join us for prayers, ceremonies, and events from
            wherever one may be. Live streaming important religious and cultural
            events will allow devotees, students, and other interested persons
            from all over the world to watch, learn, and even participate from
            anywhere with an internet connection. It allows those who are unable
            to travel to the Temple a way to still take part in these important
            and sacred events.
          </p>
          <p>
            LiveStreamed events are for all to enjoy, free of any charge, so
            please come and sit in with us at the Temple.
          </p>
          <p>Om Shanti, Shanti, Shanti.</p>
          <p>- The Temple Management Team</p>
          <p>
            <em>
              P.S. "Like", Share and Subscribe to our
              <a
                href="https://youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link"
              >
                channel
              </a>
              if you like the work we're doing - it helps tremendously! If you
              are absolutely ecstatic about our endeavors please consider
              donating to the Temple
              <a
                href="/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="donation-link"
              >
                here
              </a>
              .
            </em>
          </p>
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
      </main>
      <Footer />
    </div>
  );
};

export default LiveStreamCard;
