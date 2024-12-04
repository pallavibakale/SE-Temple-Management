import React from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./AppointmentConfirmation.css"
const Confirmation =()=>{

    return(
        <div className='confirmation'>
            <div className='confirmation-section'>
                <h3> Your Booking Has Been Confirmed</h3>
                <p>Confirmation receipt has been sent to your email</p>
                <Button>Back to Homepage</Button>
            </div>

            <div className='support-section'>
                <h1 style={{color:'#FF7400 '}}> Support Our Temple</h1>
                <p style={{width:'700px'}}>Join us in preserving our sacred space and supporting our community by making a generous donation today. Every contribution makes a difference.</p>
                <Button href="/donate" style={{backgroundColor:'#FF7400',border:'none',outline:'none',borderRadius:'6px'}}>Donate Now</Button>
            </div>
        </div>
    )
}

const AppointmentConfirmation = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    navigate("/");
  };
  return (
    <div className="container text-center">
      <Navigation onLogout={handleLogout} />
      <Confirmation />
      <Footer />
    </div>
  )
}

export default AppointmentConfirmation