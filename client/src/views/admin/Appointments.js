import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FaPlus, FaTrash, FaInfoCircle, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from 'components/Headers/SimpleHeader';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, [searchTerm]);  // useEffect will react to changes in searchTerm

    const fetchAppointments = () => {
        console.log(`Searching for: ${searchTerm}`);
        axios.get(`http://localhost:5000/api/appointments?search=${encodeURIComponent(searchTerm)}`)
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => console.error('Error fetching appointments:', error));
    };

    const handleAdd = () => {
        navigate('/admin/appointments/new'); // Adjust this path as needed
    };

    const handleEdit = (id) => {
        navigate(`/admin/appointments/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/appointments/${id}`)
            .then(() => {
                fetchAppointments(); // Refresh the list after deletion
            })
            .catch(error => console.error('Failed to delete appointment:', error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <SimpleHeader />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Appointments List</h2>
                    <InputGroup>
                        <Input placeholder="Search appointments" onChange={handleSearchChange} />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <FaSearch />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <Button onClick={handleAdd} color="primary"><FaPlus /></Button>
                </div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Client</th>
                            <th>Therapist</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment._id}>
                                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                <td>{appointment.startTime} - {appointment.endTime}</td>
                                <td>{appointment.clientName}</td>
                                <td>{appointment.therapistName}</td>
                                <td>{appointment.serviceType}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <Button color="secondary" size="sm" onClick={() => handleEdit(appointment._id)}><FaInfoCircle /></Button>{' '}
                                    <Button color="danger" size="sm" onClick={() => handleDelete(appointment._id)}><FaTrash /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Appointments;
