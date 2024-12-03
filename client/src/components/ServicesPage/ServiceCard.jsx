import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const ServiceCard = ({ title, description, image}) => {
    const navigate = useNavigate();
    const handleSchedule = () => {
        const role = localStorage.getItem("role");
        if (role === "") {
          navigate("/login");
        } else {
          navigate("/schedule-appointment");
        }
      };
  return (
        <div className='card' style={{display:'flex', flexDirection: 'row',paddingLeft:'0',paddingBottom:'0',width: '380px',height:'210px',marginRight:'20px',borderTopRightRadius: '25px',border: '2px solid #FF7400'}}>
            <div className='card-details' style={{border:'none'}}>
                <h5 className='card-heading' style={{fontSize:'16px', fontWeight:'700'}}>{title}</h5>
                <p style={{fontSize:'12px'}}>{description}</p>
                <Button onClick={handleSchedule} style={{fontSize:'12px',marginLeft:'0',marginRight:'0'}}>Schedule Appointment</Button>
            </div>
            <div className='card-image'>
                <img className='card-image' src={image} alt='any image'/>
            </div>
        </div>
  )
}

export default ServiceCard