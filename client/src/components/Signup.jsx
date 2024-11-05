import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FaGoogle } from "react-icons/fa";
import "./styles/Signup.css";
import UriContext from "./UriContext";
import { useNavigate } from "react-router-dom";

// SignUpForm component handles the sign-up form functionality
const SignUpForm = () => {
  const uri = useContext(UriContext); // Accessing the URI context
  const navigate = useNavigate(); // Using the navigate function from react-router-dom
  const [formValues, setFormValues] = useState({
    // State for form values
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    empId: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(uri + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formValues, empId: undefined }), // Ensure empId is not sent from the client
        });
        if (response.ok) {
          const data = await response.json();
          toast.success(
            `Signed up successfully. Your Employee ID is ${data.empId}.`
          ); // Display empId to the user
          navigate("/login");
        } else {
          console.error("Failed to sign up:", response.statusText);
          toast.error("Failed to sign up. Please try again.");
        }
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error("Error signing up. Please try again later.");
      }
    } else {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let errors = {};
    if (!formValues.firstName.match(/^[a-zA-Z]+$/)) {
      errors.firstName = "First name must not include numbers";
    }
    if (!formValues.lastName.match(/^[a-zA-Z]+$/)) {
      errors.lastName = "Last name must not include numbers";
    }
    if (!formValues.email.includes("@")) {
      errors.email = "Email must include '@' character";
    }
    if (!formValues.phone.match(/^\+\d{1,2}-?\d{10}$/)) {
      errors.phone = "Phone number must include country code and be 10 digits";
    }
    if (
      !formValues.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
      )
    ) {
      errors.password =
        "Password must be at least 8 characters, include a number, uppercase, lowercase, and special character";
    }
    return errors;
  };

  // Render sign-up form
  return (
    <div className="signup-section">
      <Form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>
        {/* Form fields */}

        <div style={{display:"flex",flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
          <Form.Group controlId="firstName" className="form-fields">
            <Form.Label style={{display:'flex',alignItems:'flex-start'}}>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              style={{padding:'5px'}}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="form-fields">
            <Form.Label style={{display:'flex',alignItems:'flex-start'}}>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              className="input"
              value={formValues.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
            />
          </Form.Group>
        </div>
        
        <Form.Group controlId="email" className="form-fields">
          <Form.Label style={{display:'flex',alignItems:'flex-start'}}>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className="input"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="&#9993;  Enter Email"
            required
          />
        </Form.Group>
        <Form.Group controlId="phone" className="form-fields">
          <Form.Label style={{display:'flex',alignItems:'flex-start'}}>Phone:</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formValues.phone}
            className="input"
            onChange={handleInputChange}
            placeholder="&#128222;  Phone"
            required
          />
        </Form.Group>
        <Form.Group controlId="password" >
          <Form.Label style={{display:'flex',alignItems:'flex-start'}}>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            className="input"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="&#128274;  Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="address" className="form-fields">
          <Form.Label style={{display:'flex',alignItems:'flex-start'}}>Address:</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            className="input"
            value={formValues.address}
            onChange={handleInputChange}
            placeholder="Address"
            rows={3}
          />
        </Form.Group>

        {/* checkbox */}
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{fontSize:'12px',width:'20px',marginRight:'5px'}}/>
          <label for="vehicle1" style={{color:'black', marginTop:'0px',marginBottom:'3px'}}>I agree with the <span style={{color: '#171A1F'}}>Terms of Use</span> & <span>Privacy Policy</span></label><br/>
        </div>
        
        {/* Submit button */}

        <Button 
          type="submit" 
          className="submit-btn"
          style={{
            width: '520px',
            height: '44px',
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            marginLeft:'-2px',
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
          Sign up
        </Button>
        
        <p className="login-link">
            Already have an account? <a href="/login">Sign in</a>
        </p>

        <p style={{fontSize: '14px', lineHeight: '14px', fontWeight: '400', color: '#9095A1FF', marginTop:'0px', marginBottom:'10px'}}>
            <span style={{textDecoration: 'line-through',color:'#9095A1FF'}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
            </span> 
            &nbsp;or &nbsp;  
            <span style={{textDecoration: 'line-through',color:'#9095A1FF'}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
            </span>
        </p>

        <button className="signin-btn" > 
          <FaGoogle style={{marginRight: '5px'}} />
          Sign in with Google
        </button>
      </Form>
      {/* Toast notification container */}
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

// SignUpSection component renders the sign-up section
const SignUpSection = () => (
  <div className="container text-center">
    {/* Navigation */}
    <Navigation />
    {/* Sign-up form */}
    <SignUpForm />
    {/* Footer */}
    <Footer />
  </div>
);

export default SignUpSection;
