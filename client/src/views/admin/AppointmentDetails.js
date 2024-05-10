import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Container, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { FaEllipsisV } from 'react-icons/fa'; // Import FontAwesome icon
import SimpleHeader from 'components/Headers/SimpleHeader';

function AppointmentDetails() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [services, setServices] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [optionsModal, setOptionsModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/appointments/${appointmentId}`)
            .then(response => {
                const { data } = response;
                setAppointment(data);
                setSelectedService(data.serviceType);
                setSelectedStatus(data.status);
                setSelectedDate(new Date(data.date).toISOString().split('T')[0]); // Set the date part
                setSelectedStartTime(data.startTime); // Assuming startTime includes time only
                setSelectedEndTime(data.endTime); // Assuming endTime includes time only
            })
            .catch(error => console.error('Error fetching appointment details:', error));

        axios.get('http://localhost:5000/api/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));

        axios.get('http://localhost:5000/api/statuses')
            .then(response => setStatuses(response.data))
            .catch(error => console.error('Error fetching statuses:', error));
    }, [appointmentId]);

    const toggleOptionsModal = () => setOptionsModal(!optionsModal);
    const toggleEditModal = () => {
        setEditModal(!editModal);
        setOptionsModal(false); // Close options modal when opening edit modal
    };
    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModal(!deleteConfirmModal);
        setOptionsModal(false); // Close options modal when opening delete confirmation
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`)
            .then(() => navigate('/admin/booking-management'))
            .catch(error => console.error('Failed to delete appointment:', error));
    };

    const handleSaveChanges = () => {
        const updatedData = {
            serviceType: selectedService,
            status: selectedStatus,
            date: selectedDate,
            startTime: selectedStartTime,
            endTime: selectedEndTime
        };
        
        axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, updatedData)
            .then(response => {
                console.log('Update successful:', response.data);
                toggleEditModal(); // Close the modal after saving
                setAppointment({ ...appointment, ...updatedData }); // Update local state to reflect the changes
            })
            .catch(error => {
                console.error('Failed to update appointment:', error);
            });
    };

    return (
        <>
            <SimpleHeader />
            <Container>
                {appointment ? (
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                                Appointment Details
                                <Button color="link" onClick={toggleOptionsModal} className="float-right">
                                    <FaEllipsisV />
                                </Button>
                            </CardTitle>
                            <CardText><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</CardText>
                            <CardText><strong>Time:</strong> {appointment.startTime} - {appointment.endTime}</CardText>
                            <CardText><strong>Client:</strong> {appointment.clientId.name}</CardText>
                            <CardText><strong>Therapist:</strong> {appointment.therapistId.name}</CardText>
                            <CardText><strong>Service:</strong> {appointment.serviceType}</CardText>
                            <CardText><strong>Status:</strong> {appointment.status}</CardText>
                            
                        </CardBody>
                    </Card>
                ) : <p>Loading...</p>}

                
                {/* Modals here */}

                {/* Options Modal */}
                <Modal isOpen={optionsModal} toggle={toggleOptionsModal}>
                    <ModalHeader toggle={toggleOptionsModal}>Manage Appointment</ModalHeader>
                    <ModalBody>
                        <Button color="secondary" onClick={toggleEditModal} block>Edit</Button>
                        <Button color="danger" onClick={toggleDeleteConfirmModal} block>Delete</Button>
                    </ModalBody>
                </Modal>

                {/* Edit Modal */}
                <Modal isOpen={editModal} toggle={toggleEditModal}>
                    <ModalHeader toggle={toggleEditModal}>Edit Appointment</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input type="date" name="date" id="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="startTime">Start Time</Label>
                            <Input type="time" name="startTime" id="startTime" value={selectedStartTime} onChange={e => setSelectedStartTime(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="endTime">End Time</Label>
                            <Input type="time" name="endTime" id="endTime" value={selectedEndTime} onChange={e => setSelectedEndTime(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="service">Service</Label>
                            <Input type="select" name="service" id="service" value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                                {services.map(service => <option key={service} value={service}>{service}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input type="select" name="status" id="status" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                            </Input>
                        </FormGroup>
                        <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    </ModalBody>
                </Modal>
                {/* Delete Confirmation Modal */}
                <Modal isOpen={deleteConfirmModal} toggle={toggleDeleteConfirmModal}>
                    <ModalHeader toggle={toggleDeleteConfirmModal}>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this appointment?
                        <Button color="danger" onClick={handleDelete} block>Delete</Button>
                        <Button color="secondary" onClick={toggleDeleteConfirmModal} block>Cancel</Button>
                    </ModalBody>
                </Modal>
            </Container>
        </>
    );
}

export default AppointmentDetails;
