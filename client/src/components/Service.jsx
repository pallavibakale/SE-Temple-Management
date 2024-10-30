import React, { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "./styles/Services.css";

function Service({ services, onAdd, onEdit,onDelete, category }) {
  const [showModal, setShowModal] = useState(false);
  const scrollContainerRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [currentService, setCurrentService] = useState({
    title: '',
    serviceImage: null,
    alt: '',
    description: '',
    category: category
  });

  const handleClose = () => setShowModal(false);
  const handleShow = (service = null) => {
    if (service) {
      setCurrentService(service);
      setEditMode(true);
    } else {
      setCurrentService({
        title: '',
        serviceImage: null,
        alt: '',
        description: '',
        category: category
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'file') {
      setCurrentService({ ...currentService, [name]: e.target.files[0] });
    } else {
      setCurrentService({ ...currentService, [name]: value });
    }
  };

  const handleDelete = (serviceId) => {
    onDelete(serviceId);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => { 
    if (editMode) {
      onEdit(currentService);
    } else {
      onAdd(currentService);
    }
    handleClose();
  };

  return (
    <div>
      <Button onClick={() => handleShow()} className="add-service-button">Add New {category}</Button>
      <div className="scroll-container">
        <Button onClick={scrollLeft} className="scroll-button left-button">&lt;</Button>
        <div className="horizontal-scroll" ref={scrollContainerRef}>
          {services.map((service, index) => (
            <div className="image-container" key={index}>
              <img src={service.serviceImage} alt={service.alt} className="service-image" />
              <p className="image-description">{service.title}</p>
              <Button onClick={() => handleShow(service)} className="edit-service-button">Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(service._id)} className="delete-service-button">Delete</Button>
            </div>
          ))}
        </div>
        <Button onClick={scrollRight} className="scroll-button right-button">&gt;</Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Service' : 'Add Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={currentService.title} required onChange={handleChange} placeholder='Title' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="serviceImage" onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alt Text</Form.Label>
              <Form.Control type="text" name="alt" value={currentService.alt} onChange={handleChange} placeholder='Image decription' required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={currentService.description} placeholder='Description' required onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Service;
