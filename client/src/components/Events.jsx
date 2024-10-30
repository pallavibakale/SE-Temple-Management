import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // For interactive features
import EventModal from './EventModal'; // Ensure this component is properly created
import './styles/Home.css';
import './styles/AboutUs.css';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Banner from "../images/omkaar.png";
import { useNavigate } from 'react-router-dom';
//import BG from "../images/background.PNG";

// Calendar component with printing, adding, and modal functionality
const CalendarCard = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      allDay: clickInfo.event.allDay
    });
    setModalOpen(true);
  };

  const handleDateClick = (arg) => {
    setSelectedEvent({
      title: '',
      start: arg.dateStr,
      allDay: arg.allDay
    });
    setModalOpen(true);
  };

  const saveEvent = async (eventData) => {
    const method = eventData.id ? 'PUT' : 'POST';
    const response = await fetch(`/api/events/${eventData.id || ''}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    if (response.ok) {
      fetchEvents();
    }
  };

  const deleteEvent = async (id) => {
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      fetchEvents();
    }
  };

  return (
    <div className="container">
    <img
      loading="lazy"
      src={Banner}
      alt="Omkaar Temple banner"
      className="banner-image"
    />
    <Navigation onLogout={handleLogout}/>
    <main className="main-content">
      {/* <img
        loading="lazy"
        src={BG}
        alt="Temple background"
        className="background-image"
      /> */}
    <div className="about-us-card">
      <h1>Calendar Events</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        }}
        selectable={true}
        timeZone='local'
        businessHours={true}
        weekNumbers={true}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
      <p className="calendar-note">
        *All events located at main Temple site, unless otherwise specified.
      </p>
      {modalOpen && (
          <EventModal
            event={selectedEvent}
            onSave={saveEvent}
            onDelete={deleteEvent}
            onClose={() => setModalOpen(false)}
          />
        )}
    </div>
    </main>
    <Footer />
    </div>
  );
}

export default CalendarCard;
