import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Appointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/appointments')
        .then(response => {
            setAppointments(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
        <h2>Appointments</h2>
        <ul>
            {appointments.map(appointment => (
            <li key={appointment._id}>
                {appointment.clientName} - {appointment.service} on {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
            </li>
            ))}
        </ul>
        </div>
    );
}

export default Appointments;
