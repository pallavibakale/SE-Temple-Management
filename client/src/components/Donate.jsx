import React, { useState } from "react";
import Navbar from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/Donate.css";
import Banner from "../images/omkaar.png";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    setDefault: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }
    toast.success('Payment submitted successfully!');
    // Add your payment submission logic here
    console.log(formData);
  };

  const validateForm = () => {
    // Validating each field based on specifications
  
    // Validating Full Name
    if (formData.fullName === "" || !/^[a-zA-Z ]+$/.test(formData.fullName)) {
      toast.error('Please enter a valid name.');
      return false;
    }
  
    // Validating Card Number
    if (formData.cardNumber === "" || !/^\d{16}$/.test(formData.cardNumber)) {
      toast.error('Please enter a 16-digit card number.');
      return false;
    }
  
    // Validating Expiry Date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-indexed month
    const currentYear = currentDate.getFullYear();
    const [expiryMonth, expiryYear] = formData.expiry.split('/');
    if (
      formData.expiry === "" ||
      !/^\d{2}\/\d{4}$/.test(formData.expiry) ||
      parseInt(expiryMonth, 10) > 12 || parseInt(expiryMonth, 10) === 0 ||
      parseInt(expiryYear, 10) < currentYear || (parseInt(expiryYear, 10) === currentYear && parseInt(expiryMonth, 10) < currentMonth)
    ) {
      toast.error('Please enter a valid expiry date (MM/YYYY).');
      return false;
    }
  
    // Validating CVV
    if (formData.cvv === "" || !/^\d{3}$/.test(formData.cvv)) {
      toast.error('Please enter a 3-digit CVV.');
      return false;
    }
  
    return true;
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };
  
  return (
    <div className="donate-container">
        <img
      loading="lazy"
      src={Banner}
      alt="Omkaar Temple banner"
      className="banner-image"
    /><Navbar onLogout={handleLogout}/>
      <div className="bg-orange-">
        
        <ToastContainer />
        <div className="container">
      
          <div className="row">
            <div className="col-50">
              <h3>Billing Address</h3>
              <form onSubmit={handleSubmit} className="address-form">
                <label htmlFor="fullName"><i className="fa fa-user" /> Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John M. Doe" required />
                <label htmlFor="email"><i className="fa fa-envelope" /> Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                <label htmlFor="address"><i className="fa fa-address-card-o" /> Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="542 W. 15th Street" required />
                <label htmlFor="city"><i className="fa fa-institution" /> City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="New York" required />
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} placeholder="NY" required />
                  </div>
                  <div className="col-50">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} placeholder="10001" required pattern="[0-9]{5}" />
                  </div>
                </div>
                <label>
                  <input type="checkbox" name="sameadr" checked={formData.sameadr} onChange={handleChange} />{" "}
                  Shipping address same as billing
                </label>
              </form>
            </div>
            <div className="col-50">
              <h3>Payment</h3>
              <form onSubmit={handleSubmit} className="payment-form">
                <div className="credit-card-form">
                  <div className="card-details">
                    <header className="card-header">
                      <div className="card-title">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0992e1602ebc6cdcc213376c38f9afe9f557f203c13006cd32aebae45e8507b5?apiKey=e2d6830adb1d4fc9a00d0bd25d383d5b&" alt="Credit card icon" className="credit-card-icon" />
                        <div className="title-text">Add new card</div>
                      </div>
                      <div className="card-logos">
                        <div className="card-logo-group">
                          <div className="mastercard-logo" />
                          <div className="visa-logo" />
                        </div>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b6ded70f88a266e3ffe1223fba66102ad6e2da1c8d3c6755c6f0f5c9cde6255?apiKey=e2d6830adb1d4fc9a00d0bd25d383d5b&" alt="MasterCard logo" className="card-logo" />
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2496026a85f21dbca5bd61b208f04b092fc1599f0aabdf7f9277edba4a87dbfe?apiKey=e2d6830adb1d4fc9a00d0bd25d383d5b&" alt="Visa logo" className="card-logo" />
                      </div>
                    </header>
                    <div className="card-inputs">
                      <div className="input-group">
                        <label htmlFor="cardNumber">Card number</label>
                        <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="input-group">
                        <label htmlFor="cardName">Card owner</label>
                        <input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} placeholder="John Doe" required />
                      </div>
                      <div className="input-group">
                        <label htmlFor="expiry">Expiry date</label>
                        <input type="text" id="expiry" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YYYY" maxLength="7" required />
                      </div>
                      <div className="input-group">
                        <label htmlFor="cvv">CVV2</label>
                        <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="3" required />
                      </div>
                    </div>

                  </div>
                </div>
                <div className="button-container">
                  <input type="submit" value="Submit" className="btn bg-blue-500" />
                  <Link to="/Donations" className="btn bg-red-800 hover:bg-red-dark text-white py-2 px-4 rounded">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donate;