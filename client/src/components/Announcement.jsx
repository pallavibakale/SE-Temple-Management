import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function Announcement({ announcements, onExpand, expandedIndex, onAdd, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState({ title: '', description: '' });

  const handleClose = () => setShowModal(false);
  const handleShow = (announcement = null) => {
    if (announcement) {
      setCurrentAnnouncement(announcement);
      setEditMode(true);
    } else {
      setCurrentAnnouncement({  title: '', description: '' });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    setCurrentAnnouncement({ ...currentAnnouncement, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editMode) {
      onEdit(currentAnnouncement);
    } else {
      onAdd(currentAnnouncement);
    }
    handleClose();
  };

  return (
    <div>
      <Button onClick={() => handleShow()} className="add-announcement-button">Add New Announcement</Button>
      {announcements.map((announcement, index) => (
        <div key={index} className="announcement-item">
          <div className="announcement-title">{announcement.title}</div>
          {expandedIndex === index && <div className="announcement-description">{announcement.description}</div>}
          <Button onClick={() => onExpand(index)}>{expandedIndex === index ? 'Collapse' : 'Expand'}</Button>
          <Button onClick={() => handleShow(announcement)} className="edit-announcement-button">Edit</Button>
          <Button onClick={() => onDelete(announcement._id)} className="delete-announcement-button btn-danger">Delete</Button>
        </div>
      ))}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Announcement' : 'Add Announcement'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentAnnouncement.title}
                onChange={handleChange}
                placeholder='Title'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentAnnouncement.description}
                onChange={handleChange}
                placeholder='Description'
              />
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

export default Announcement;
