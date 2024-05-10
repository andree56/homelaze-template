import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Modal, ModalHeader, ModalBody, Button, Table, FormGroup, Label } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SimpleHeader from 'components/Headers/SimpleHeader';

function ClientManagement() {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const [modal, setModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        axios.get('http://localhost:5000/api/client-management')
            .then(response => {
                setClients(response.data);
                setFilteredClients(response.data);
            })
            .catch(error => console.error('Error fetching clients:', error));
    };

    const toggle = () => setModal(!modal);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        const filtered = clients.filter(client => client.name.toLowerCase().includes(value) || client.phone.includes(value));
        setFilteredClients(filtered);
    };

    const handleDelete = (clientId) => {
        axios.delete(`http://localhost:5000/api/client-management/${clientId}`)
            .then(() => {
                fetchClients(); // Refresh the list after deleting
                alert('Client deleted successfully');
            })
            .catch(error => console.error('Error deleting client:', error));
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setEditMode(true);
        toggle();
    };

    const saveClient = () => {
        const method = editMode ? 'put' : 'post';
        const url = `http://localhost:5000/api/client-management${editMode ? '/' + selectedClient._id : ''}`;
    
        axios[method](url, selectedClient)
            .then(() => {
                toggle(); // Close the modal
                fetchClients(); // Refresh the client list
                alert(`Client ${editMode ? 'updated' : 'added'} successfully`);
            })
            .catch(error => console.error(`Error ${editMode ? 'updating' : 'adding'} client:`, error));
    };
    

    return (
        <>
            <SimpleHeader />
            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-2">
                    <Input placeholder="Search by name or phone" onChange={handleSearch} />
                    <Button color="primary" onClick={() => { setSelectedClient({}); setEditMode(false); toggle(); }}>Add Client</Button>
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client._id}>
                                <td>{client.name}</td>
                                <td>{client.phone}</td>
                                <td>{client.city}</td>
                                <td>
                                    <Button color="link" onClick={() => handleEdit(client)}><FaEdit /></Button>
                                    <Button color="link" onClick={() => handleDelete(client._id)}><FaTrashAlt /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal for adding or editing client details */}
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{editMode ? 'Edit Client' : 'Add Client'}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="clientName">Name</Label>
                            <Input
                                type="text"
                                id="clientName"
                                value={selectedClient.name || ''}
                                onChange={e => setSelectedClient({ ...selectedClient, name: e.target.value })}
                                placeholder="Enter client's name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="clientPhone">Phone</Label>
                            <Input
                                type="text"
                                id="clientPhone"
                                value={selectedClient.phone || ''}
                                onChange={e => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                                placeholder="Enter phone number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="clientBarangay">Barangay</Label>
                            <Input
                                type="text"
                                id="clientBarangay"
                                value={selectedClient.barangay || ''}
                                onChange={e => setSelectedClient({ ...selectedClient, barangay: e.target.value })}
                                placeholder="Enter barangay"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="clientCity">City</Label>
                            <Input
                                type="text"
                                id="clientCity"
                                value={selectedClient.city || ''}
                                onChange={e => setSelectedClient({ ...selectedClient, city: e.target.value })}
                                placeholder="Enter city"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="clientAddress">Address</Label>
                            <Input
                                type="text"
                                id="clientAddress"
                                value={selectedClient.address || ''}
                                onChange={e => setSelectedClient({ ...selectedClient, address: e.target.value })}
                                placeholder="Enter address"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="clientFacebookLink">Facebook Link</Label>
                            <Input
                                type="url"
                                id="clientFacebookLink"
                                value={selectedClient.facebookLink || ''}
                                onChange={e => setSelectedClient({ ...selectedClient, facebookLink: e.target.value })}
                                placeholder="Enter Facebook profile link"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="clientNotes">Notes</Label>
                            <Input
                                type="textarea"
                                id="clientNotes"
                                value={selectedClient.notes || ''}
                                onChange={e => setSelectedClient({ ...selectedClient, notes: e.target.value })}
                                placeholder="Enter any notes"
                            />
                        </FormGroup>
                        <Button color="primary" onClick={saveClient}>Save</Button>
                    </ModalBody>
                </Modal>
            </div>
        </>
    );
}

export default ClientManagement;
