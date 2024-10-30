import React, { useState } from 'react';

const EventModal = ({ event, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.start);
  const [allDay, setAllDay] = useState(event.allDay);

  const handleSubmit = () => {
    onSave({ ...event, title, start: date, allDay });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Event Title" />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <label>
          All Day
          <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} />
        </label>
        <button onClick={handleSubmit}>Save</button>
        {event.id && <button onClick={() => onDelete(event.id)}>Delete</button>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventModal;
