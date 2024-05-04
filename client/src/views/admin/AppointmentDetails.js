import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Container, Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader';
import { FaEllipsisV } from 'react-icons/fa'; // Import the icon for options

function AppointmentDetails() {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/appointments/${appointmentId}`)
            .then(response => {
                setAppointment(response.data);
            })
            .catch(error => {
                console.error('Error fetching appointment:', error);
            });
    }, [appointmentId]);

    const toggleModal = () => setModal(!modal);

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`)
            .then(() => {
                navigate('/booking-management'); // Navigate back to the booking management after deletion
            })
            .catch(error => console.error('Failed to delete appointment:', error));
    };

    const handleEdit = () => {
        // This could navigate to an edit page or toggle another modal for editing
        console.log('Edit action triggered');
    };

    return (
        <>
            <SimpleHeader />
            <Container>
                {appointment ? (
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                                Appointment Details for {appointment.clientId.name}
                                <Button color="link" onClick={toggleModal} className="float-right">
                                    <FaEllipsisV /> {/* Icon for options */}
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
                ) : (
                    <Row>
                        <Col>
                            <p>Loading...</p>
                        </Col>
                    </Row>
                )}

                {/* Modal for Edit/Delete options */}
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Manage Appointment</ModalHeader>
                    <ModalBody>
                        <Button color="secondary" onClick={handleEdit} block>Edit</Button>
                        <Button color="danger" onClick={handleDelete} block>Delete</Button>
                    </ModalBody>
                </Modal>
            </Container>
        </>
    );
}

export default AppointmentDetails;
