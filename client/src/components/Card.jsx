import React from 'react'
import './styles/Card.css'
const Card = ({ title, description, image }) => {
  return (
    <div className='card' style={{display:'flex', flexDirection: 'row',paddingLeft:'0',paddingBottom:'0',height:'210px',marginRight:'20px',borderTopRightRadius: '25px',border: '2px solid #FF7400'}}>
        <div className='card-details' style={{border:'none'}}>
            <h5 className='card-heading' style={{fontSize:'16px', fontWeight:'700'}}>{title}</h5>
            <p style={{fontSize:'12px'}}>{description}</p>
        </div>
        <div className='card-image'>
            <img className='card-image' src={image} alt='any image'/>
        </div>
    </div>
  )
}

export default Card