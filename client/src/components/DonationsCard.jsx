import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./styles/Home.css";
import "./styles/Donations.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Banner from "../images/omkaar.png";
import { useNavigate } from "react-router-dom";

const DonationOption = ({ title, description, buttonText, isMonthly = false }) => {
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("$11 per month");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setIsOpen(false);
  };

  const handleDonation=()=>{
    navigate('/card-details');
  }

  return (
    <div className="donation-option">
      <div className="donation-title">{title}</div>
      {isMonthly && (
        <div className="monthly-pledge">
          <div className="pledge-dropdown">
            <div className="selected-amount" onClick={toggleDropdown}>
              Pledge: {selectedAmount} <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
            </div>
            {isOpen && (
              <div className="dropdown-options">
                <div className="dropdown-option" onClick={() => handleAmountClick("$11 per month")}>
                  $11 per month
                </div>
                <div className="dropdown-option" onClick={() => handleAmountClick("$21 per month")}>
                  $21 per month
                </div>
                <div className="dropdown-option" onClick={() => handleAmountClick("$51 per month")}>
                  $51 per month
                </div>
                <div className="dropdown-option" onClick={() => handleAmountClick("$101 per month")}>
                  $101 per month
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="donation-button" onClick={handleDonation}>{buttonText}</div>
    </div>
  );
};

function DonationsCard() {
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
      <img src={Banner} alt="" className="banner-image" />
      <Navigation onLogout={handleLogout}/>
      <main className="main-content">
        <h1 className="page-title">Donations</h1>
        <section className="donation-info">
          <div className="donation-details">
            <p className="npo-info">
              NPO ID#: 17053281338009
              <br />
              Omkaar Temple is a Non-Profit Organization and all donations are
              tax deductible.
              <br />
              Thank you for considering donating to Omkaar Temple. The construction
              of Omkaar Temple is truly a monumental undertaking, and any contribution
              you make goes a long way. The growth of the Temple and its associated
              religious activities depend greatly on the generous donations of devotees
              like you. Thank you again for helping our community realize its collective
              dream for Omkaar Temple.
              <br />
              - Omkaar Temple Administration
            </p>
            <div className="donation-options">
              <DonationOption
                title={
                  <>
                    <span className="donation-type">One Time Donation:</span>
                    <br />
                    via Credit Card, Bank Transfer, or PayPal
                  </>
                }
                buttonText="Donate"
              />
              <DonationOption
                title={
                  <>
                    <span className="donation-type">Monthly Donation:</span>
                    <br />
                    via Credit Card, Bank Transfer, or PayPal. Cancel anytime{" "}
                    <a href="/cancel" className="cancel-link">
                      here
                    </a>
                    .
                  </>
                }
                buttonText="Donate"
                isMonthly
              />
            </div>
          </div>
          <p className="cash-check-info">
            Cash/Check Donations:
            <br />
            If you prefer making more traditional donations, please download our
            Donation Form below. Right-click and "Save As" to download and fill
            it out electronically before printing (or simply print and fill it out
            by hand). You can drop off cash and checks at the Temple in person
            or mail checks to our mailing address. Please do not mail cash. Thank
            you for your support!
            <a href="/pay" className="donation-form-link">
              Donation Form
            </a>
          </p>
        </section>
      </main>
      <Footer />
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
  );
}

export default DonationsCard;