import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // Changed from useHistory to useNavigate
import SimpleHeader from 'components/Headers/SimpleHeader';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate(); // Changed from useHistory to useNavigate

    useEffect(() => {
        axios.get('http://localhost:5000/api/appointments')
        .then(response => {
            setAppointments(response.data);
        })
        .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    const viewAppointmentDetails = (appointmentId) => {
        console.log("Clicked appointment ID:", appointmentId);
        navigate(`/admin/appointments/${appointmentId}`); // Changed from history.push to navigate
    };

    return (
        <>
        <SimpleHeader />
        <div className="container mt-4">
        <h2>Appointments List</h2>
        <Table hover responsive>
            <thead>
            <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Client</th>
                <th>Therapist</th>
                <th>Service</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map(appointment => (
                <tr key={appointment._id} onClick={() => viewAppointmentDetails(appointment._id)}>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.startTime} - {appointment.endTime}</td>
                <td>{appointment.clientId.name}</td>
                <td>{appointment.therapistId.name}</td>
                <td>{appointment.serviceType}</td>
                <td>{appointment.status}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </div>
        </>
    );
}

export default Appointments;
