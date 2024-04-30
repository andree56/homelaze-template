// BookingManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import UserHeader from "components/Headers/UserHeader.js";

const BookingManagement = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/therapists')
      .then(response => {
        const formattedTherapists = response.data.map(therapist => ({
          id: therapist._id,
          title: therapist.name,
          eventColor: therapist.color // Color from the backend
        }));
        setTherapists(formattedTherapists);
      })
      .catch(error => console.error('Failed to fetch therapists:', error));
  }, []);

  const eventContent = (eventInfo) => {
    const { event } = eventInfo;
    return (
      <div style={{
        backgroundColor: event.backgroundColor, // Use color directly from event (assigned via therapists' info)
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
        fontSize: '0.85em',
        display: 'block'
      }}>
        <strong>{event.title}</strong>
        <div>{`Client: ${event.extendedProps.clientName}`}</div>
        <div>{`Time: ${new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - ${new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}</div>
      </div>
    );
  };

  return (
    <div className='booking-management'>
      <UserHeader />
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineDay"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
        }}
        resources={therapists}
        events={[]}
        eventContent={eventContent}
        slotDuration='00:15:00'
      />
    </div>
  );
};

export default BookingManagement;
