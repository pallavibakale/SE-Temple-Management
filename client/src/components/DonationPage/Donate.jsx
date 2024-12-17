import React, { useState, useContext, useEffect } from "react";
import Navbar from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UriContext from "../ContextApi/UriContext";
import "react-toastify/dist/ReactToastify.css";
import "./Donate.css";

import { useNavigate } from "react-router-dom";

const Donate = () => {
  const uri = useContext(UriContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "Devotee") {
      navigate("/login");
    }
  }, []);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    address: "",
    amount: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    setDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(uri + "/add-donation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        if (response.ok) {
          toast.success("Donation successful, thank you!");
          navigate("/");
        } else {
          toast.error("Failed to donate. Please try again.");
        }
      } catch (error) {
        toast.error("Error donating. Please try again later.", error);
      }
    } else {
      setFormErrors(errors);
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
    }
  };

  const validateForm = () => {
    if (
      formValues.fullName === "" ||
      !/^[a-zA-Z ]+$/.test(formValues.fullName)
    ) {
      toast.error("Please enter a valid name.");
      return false;
    }

    if (
      formValues.cardNumber === "" ||
      !/^\d{16}$/.test(formValues.cardNumber)
    ) {
      toast.error("Please enter a 16-digit card number.");
      return false;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [expiryMonth, expiryYear] = formValues.expiry.split("/");
    if (
      formValues.expiry === "" ||
      !/^\d{2}\/\d{4}$/.test(formValues.expiry) ||
      parseInt(expiryMonth, 10) > 12 ||
      parseInt(expiryMonth, 10) === 0 ||
      parseInt(expiryYear, 10) < currentYear ||
      (parseInt(expiryYear, 10) === currentYear &&
        parseInt(expiryMonth, 10) < currentMonth)
    ) {
      toast.error("Please enter a valid expiry date (MM/YYYY).");
      return false;
    }

    if (formValues.cvv === "" || !/^\d{3}$/.test(formValues.cvv)) {
      toast.error("Please enter a 3-digit CVV.");
      return false;
    }

    return true;
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };

  return (
    <div className="donate-container">
      <Navbar onLogout={handleLogout} />
      <div className="bg-orange-">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-50">
              <h3>Billing Address</h3>
              <form onSubmit={handleSubmit} className="address-form">
                <label htmlFor="fullName">
                  <i className="fa fa-user" /> Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formValues.fullName}
                  onChange={handleChange}
                  placeholder="John M. Doe"
                  required
                />
                <label htmlFor="email">
                  <i className="fa fa-envelope" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
                <label htmlFor="address">
                  <i className="fa fa-address-card-o" /> Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  placeholder="542 W. 15th Street"
                  required
                />
                <label htmlFor="city">
                  <i className="fa fa-institution" /> City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                  placeholder="New York"
                  required
                />
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formValues.state}
                      onChange={handleChange}
                      placeholder="NY"
                      required
                    />
                  </div>
                  <div className="col-50">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formValues.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      required
                      pattern="[0-9]{5}"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-50">
              <h3>Payment</h3>
              <form onSubmit={handleSubmit} className="payment-form">
                <div className="credit-card-form">
                  <div className="card-details">
                    <div className="card-inputs">
                      <div className="input-group">
                        <label htmlFor="amount">Enter Amount</label>
                        <input
                          type="text"
                          id="amount"
                          name="amount"
                          value={formValues.amount}
                          onChange={handleChange}
                          placeholder="$"
                          required
                        />
                      </div>
                    </div>
                    <header className="card-header">
                      <div className="card-title">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0992e1602ebc6cdcc213376c38f9afe9f557f203c13006cd32aebae45e8507b5?apiKey=e2d6830adb1d4fc9a00d0bd25d383d5b&"
                          alt="Credit card icon"
                          className="credit-card-icon"
                        />
                        <div className="title-text">Add new card</div>
                      </div>
                      <div className="card-logos">
                        <div className="card-logo-group">
                          <div className="mastercard-logo" />
                          <div className="visa-logo" />
                        </div>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b6ded70f88a266e3ffe1223fba66102ad6e2da1c8d3c6755c6f0f5c9cde6255?apiKey=e2d6830adb1d4fc9a00d0bd25d383d5b&"
                          alt="MasterCard logo"
                          className="card-logo"
                        />
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2496026a85f21dbca5bd61b208f04b092fc1599f0aabdf7f9277edba4a87dbfe?apiKey=e2d6830adb1d4fc9a00d0bd25d383d5b&"
                          alt="Visa logo"
                          className="card-logo"
                        />
                      </div>
                    </header>
                    <div className="card-inputs">
                      <div className="input-group">
                        <label htmlFor="cardNumber">Card number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formValues.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="cardName">Card owner</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formValues.cardName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="expiry">Expiry date</label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={formValues.expiry}
                          onChange={handleChange}
                          placeholder="MM/YYYY"
                          maxLength="7"
                          required
                        />
                      </div>
                      <div className="input-group" style={{ width: "90%" }}>
                        <label htmlFor="cvv">CVV</label>
                        <br />
                        <input
                          type="password"
                          id="cvv"
                          name="cvv"
                          value={formValues.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength="3"
                          required
                          style={{ border: "1px solid #ccc" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <input
                    type="submit"
                    value="Donate Now"
                    className="submit-button"
                    style={{
                      backgroundColor: "#FF7400",
                      border: "none",
                      outline: "none",
                      borderRadius: "6px",
                      color: "white",
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
