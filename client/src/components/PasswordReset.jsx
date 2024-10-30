import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Banner from "../images/omkaar.png";
import "./styles/Signup.css";
import UriContext from './UriContext';
import { useNavigate } from "react-router-dom";

const Password = () => {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${uri}/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        toast.success('OTP sent to your email.');
      } else {
        toast.error('Email not registered or server error.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error sending OTP. Please try again later.');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (password !== password1) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch(`${uri}/reset-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp, password })
      });
      if (response.ok) {
        toast.success('Password reset successful!');
        navigate('/login');
      } else {
        toast.error('Failed to reset. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error resetting password. Please try again later.');
    }
  };

  return (
    <div className="signup-section">
      <Form className="signup-form" onSubmit={handleEmailSubmit}>
        <h2 className="form-title">Reset Password</h2>
        <Form.Group controlId="email" className="form-fields">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">Send OTP</Button>
      </Form>
      <Form className="signup-form" onSubmit={handleResetSubmit}>
        <Form.Group controlId="otp" className="form-fields">
          <Form.Label>OTP:</Form.Label>
          <Form.Control
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="form-fields">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="password1" className="form-fields">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">Reset Password</Button>
      </Form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

const PasswordReset = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };
  return (
  <div className="container text-center">
    <img
      loading="lazy"
      src={Banner}
      alt="Omkaar Temple banner"
      className="banner-image"
    />
    <Navigation onLogout={handleLogout}/>
    <Password />
    <Footer />
  </div>
);
}

export default PasswordReset;
