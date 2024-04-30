import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction'; // for draggable events, if needed
import UserHeader from "components/Headers/UserHeader.js";

// Define therapists as resources
const therapists = [
  { id: '1', title: 'Therapist A' },
  { id: '2', title: 'Therapist B' },
  { id: '3', title: 'Therapist C' }
];

// Therapist colors
const therapistColors = {
  'Therapist A': '#faa732',
  'Therapist B': '#56ab2f',
  'Therapist C': '#3498db'
};

const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format

const events = [
  {
    id: '1',
    resourceId: '1',
    start: `${today}T09:00:00`,
    end: `${today}T10:30:00`,
    title: 'Swedish Massage',
    extendedProps: {
      therapist: 'Therapist A',
      clientName: 'John Doe',
      serviceType: 'Swedish Massage'
    }
  },
  {
    id: '2',
    resourceId: '2',
    start: `${today}T09:30:00`,
    end: `${today}T11:00:00`,
    title: 'Deep Tissue Massage',
    extendedProps: {
      therapist: 'Therapist B',
      clientName: 'Jane Smith',
      serviceType: 'Deep Tissue Massage'
    }
  },
  {
    id: '3',
    resourceId: '1',
    start: `${today}T10:15:00`,
    end: `${today}T11:45:00`,
    title: 'Reflexology',
    extendedProps: {
      therapist: 'Therapist A',
      clientName: 'Emily Roe',
      serviceType: 'Reflexology'
    }
  },
  {
    id: '4',
    resourceId: '3',
    start: `${today}T11:00:00`,
    end: `${today}T12:30:00`,
    title: 'Sports Massage',
    extendedProps: {
      therapist: 'Therapist C',
      clientName: 'Mike Johnson',
      serviceType: 'Sports Massage'
    }
  },
  {
    id: '5',
    resourceId: '2',
    start: `${today}T11:15:00`,
    end: `${today}T12:45:00`,
    title: 'Aromatherapy',
    extendedProps: {
      therapist: 'Therapist B',
      clientName: 'Chris P. Bacon',
      serviceType: 'Aromatherapy'
    }
  }
];

const BookingManagement = () => {

  // Custom render function to apply specific display for events, including therapist colors
  const eventContent = (eventInfo) => {
    const { event } = eventInfo;
    const { clientName } = event.extendedProps; // Destructuring for easier access
    const backgroundColor = therapistColors[eventInfo.event.extendedProps.therapist] || '#3174ad'; // Default color if no match found
  
    return (
      <div style={{
        backgroundColor: backgroundColor, // Color based on therapist
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
        fontSize: '0.85em',
        display: 'block', // Ensures the content is properly aligned
        overflow: 'hidden', // Prevents content spilling
        textOverflow: 'ellipsis', // Ensures text does not overflow its container
        whiteSpace: 'nowrap' // Keeps the content on one line
      }}>
        <strong>{event.title}</strong> {/* Display the type of massage */}
        <div>{`Client: ${clientName}`}</div> {/* Client's Name */}
        <div>{`Time: ${new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - ${new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}</div>      </div>
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
        events={events} // Your events array
        eventContent={eventContent} // Use the custom event rendering function
        slotDuration='00:15:00'
      />
    </div>
  );
};

export default BookingManagement;
