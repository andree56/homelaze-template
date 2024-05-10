import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import SimpleHeader from 'components/Headers/SimpleHeader';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

const BookingManagement = () => {
    const [events, setEvents] = useState([]);
    const [resources, setResources] = useState([]);
    const navigate = useNavigate();  // Instantiate useNavigate for navigation

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Use today's date or fetch date from another source

        axios.get('http://localhost:5000/api/therapists')
            .then(response => {
                const formattedResources = response.data.map(therapist => ({
                    id: therapist._id,
                    title: therapist.name,
                    eventColor: therapist.color  // Assuming each therapist has a 'color' field
                }));
                setResources(formattedResources);
            })
            .catch(error => console.error('Failed to fetch therapists:', error));

            axios.get('http://localhost:5000/api/appointments')
            .then(response => {
                console.log("Appointments fetched:", response.data);
                const formattedEvents = response.data.map(appointment => ({
                    id: appointment._id,
                    resourceId: appointment.therapistId,
                    title: `${appointment.clientName} - ${appointment.serviceType}`,
                    start: appointment.start, // Construct full datetime string
                    end: appointment.end,
                    backgroundColor: appointment.therapistColor
                }));
                console.log(formattedEvents)
                setEvents(formattedEvents);
            })
            .catch(error => console.error('Failed to fetch appointments:', error));
    }, []);

    const handleEventClick = (clickInfo) => {
        // Navigate to the appointment details page using navigate
        console.log(clickInfo.event.id);
        navigate(`/admin/appointments/${clickInfo.event.id}`);
    };

    return (
        <>
            <SimpleHeader />
            <div className='booking-management'>
                <FullCalendar
                    plugins={[resourceTimelinePlugin, interactionPlugin]}
                    initialView="resourceTimelineDay"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
                    }}
                    resources={resources}
                    events={events}
                    slotDuration='00:15:00'
                    eventClick={handleEventClick}  // Add the click handler here
                    eventContent={renderEventContent}  // Custom render function for events
                />
            </div>
        </>
    );
};

function renderEventContent(eventInfo) {
    return (
        <>
            <div><strong>{eventInfo.event.title.split(' - ')[0]}</strong></div>
            <div>{eventInfo.event.title.split(' - ')[1]}</div>
            <div>{new Date(eventInfo.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(eventInfo.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </>
    );
}

export default BookingManagement;
