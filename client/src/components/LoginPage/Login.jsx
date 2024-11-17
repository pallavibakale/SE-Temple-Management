import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { FaGoogle } from "react-icons/fa";

import "./Login.css";
import UriContext from "../ContextApi/UriContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(uri + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.message === "Logged successfully") {
          toast.success("Logged in successfully");
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user.empId);
          localStorage.setItem("role", data.user.role);
          
          if (data.user.role === "Admin") {
            navigate("/admin-home");
          } else {
            navigate("/");
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to connect to the server" + error);
      }
    } else {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formValues.email.includes("@")) {
      errors.email = "Email must include '@' character";
    }
    if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };

  return (
    <div className="login-section">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign in</h2>
        <button style={{   
            width: '520px',
            height: '44px',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter',
            fontSize: '16px',
            lineHeight: '26px',
            fontWeight: '400',
            color: '#FFFFFF',
            background: '#4E85EB',
            border: 'none',
            borderRadius: '6px',
            gap: '6px',
            cursor: 'pointer',
            opacity: '1',
          }}> 
          <FaGoogle style={{marginRight: '5px'}} />
          Sign in with Google
        </button>

        <p style={{fontSize: '14px', lineHeight: '22px', fontWeight: '400', color: '#9095A1FF', marginTop:'5px'}}>
            <span style={{textDecoration: 'line-through',color:'#9095A1FF'}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
            </span> 
            &nbsp;or &nbsp;  
            <span style={{textDecoration: 'line-through',color:'#9095A1FF'}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
            </span>
        </p>
        <Form.Group controlId="email" className="input-group">
          <Form.Label className="form-label">Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formValues.email}
            style={{
              width: '520px',
              height: '36px',
              paddingLeft: '15px',
              paddingRight: '12px',
              fontFamily: 'Inter',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: '400',
              background: '#F3F4F6',
              borderRadius: '6px',
              borderWidth: '0px',
              outline: 'none',
              color: '#BDC1CA'
            }}
            onChange={handleInputChange}
            placeholder="&#9993;  Email"
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="input-group">
          <Form.Label className="form-label">Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            style={{
              width: '520px',
              height: '36px',
              paddingLeft: '15px',
              paddingRight: '12px',
              fontFamily: 'Inter',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: '400',
              background: '#F3F4F6',
              borderRadius: '6px',
              borderWidth: '0px',
              outline: 'none',
              color: '#BDC1CA'
            }}
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="&#128274;  Password"
            required
          />
          
        </Form.Group>
        
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <p href="/forgot-password" className="text-muted forgot-password">Forgot Password?</p>
          <p className="login-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
       

        <Button 
          type="submit" 
          className="btn-success"
          style={{
            width: '520px',
            height: '44px',
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter',
            fontSize: '16px',
            lineHeight: '26px',
            fontWeight: '400',
            color: '#FFFFFF',
            background: '#FF7400',
            opacity: 1,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
          Sign in
        </Button>
      </Form>
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
};

const LoginSection = () => (
  <div className="container text-center">
    <Navigation />
    <LoginForm />
    <Footer />
  </div>
);

export default LoginSection;
