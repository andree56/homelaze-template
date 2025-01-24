import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, FormGroup, Label, Input } from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader';

function AppointmentAdd() {
    const [services, setServices] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [clients, setClients] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [formData, setFormData] = useState({
        serviceType: '',
        status: '',
        clientId: '',
        therapistId: '',
        date: '',
        startTime: '',
        endTime: '',
        notes: '',
        pax: 1,
        price: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));

        axios.get('http://localhost:5000/api/statuses')
            .then(response => setStatuses(response.data))
            .catch(error => console.error('Error fetching statuses:', error));

        axios.get('http://localhost:5000/api/client-management')
            .then(response => setClients(response.data))
            .catch(error => console.error('Error fetching clients:', error));

        axios.get('http://localhost:5000/api/therapists')
            .then(response => setTherapists(response.data))
            .catch(error => console.error('Error fetching therapists:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            price: e.target.name === 'serviceType' ? services[e.target.value] * formData.pax : formData.price
        });
    };

    const handlePaxChange = (e) => {
        setFormData({
            ...formData,
            pax: e.target.value,
            price: services[formData.serviceType] * e.target.value
        });
        console.log(services[formData.serviceType])
    };

    const handleSubmit = () => {
        if (!formData.therapistId || !formData.clientId || !formData.serviceType || !formData.status) {
            alert('Please fill in all fields.');
            return;
        }
        axios.post('http://localhost:5000/api/appointments', formData)
            .then(response => {
                console.log("test forma data submit: ", formData)
                navigate('/admin/appointments');
            })
            .catch(error => {
                console.error('Error adding appointment:', error);
            });
    };

    return (
        <>
        <SimpleHeader />   
        <Container>
            <h2>Add Appointment</h2>
            <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" value={formData.date} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="startTime">Start Time</Label>
                <Input type="time" name="startTime" id="startTime" value={formData.startTime} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="endTime">End Time</Label>
                <Input type="time" name="endTime" id="endTime" value={formData.endTime} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="serviceType">Service</Label>
                <Input type="select" name="serviceType" id="serviceType" value={formData.serviceType} onChange={handleChange}>
                    <option value="">Select Service...</option>
                    {Object.keys(services).map(service => (
                        <option key={service} value={service}>
                            {service} {/* Display the name of the service type */}
                        </option>
                    ))}
                </Input>

            </FormGroup>
            <FormGroup>
                <Label for="pax">Number of People</Label>
                <Input type="number" name="pax" id="pax" min="1" value={formData.pax} onChange={handlePaxChange} />
            </FormGroup>
            <FormGroup>
                <Label for="price">Price</Label>
                <Input type="text" name="price" id="price" value={formData.price} disabled />
            </FormGroup>
            <FormGroup>
                <Label for="status">Status</Label>
                <Input type="select" name="status" id="status" value={formData.status} onChange={handleChange}>
                    <option value="">Select Status...</option>
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="clientId">Client</Label>
                <Input type="select" name="clientId" id="clientId" value={formData.clientId} onChange={handleChange}>
                    <option value="">Select Client...</option>
                    {clients.map(client => <option key={client._id} value={client._id}>{client.name}</option>)}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="therapistId">Therapist</Label>
                <Input type="select" name="therapistId" id="therapistId" value={formData.therapistId} onChange={handleChange}>
                    <option value="">Select Therapist...</option>
                    {therapists.map(therapist => <option key={therapist._id} value={therapist._id}>{therapist.name}</option>)}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="notes">Special Instructions</Label>
                <Input type="textarea" name="notes" id="notes" value={formData.notes} onChange={handleChange} />
            </FormGroup>
            <Button color="primary" onClick={handleSubmit}>Save Appointment</Button>
        </Container>
        </>
    );
}

export default AppointmentAdd;
