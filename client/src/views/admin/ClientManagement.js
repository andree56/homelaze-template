import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, Button, Table } from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader';

function ClientManagement() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get('http://localhost:5000/api/client-management')
        .then(response => {
            setClients(response.data);
        })
        .catch(error => console.error('Error fetching clients:', error));
    }, []);

    return (
        <>
        <SimpleHeader />
        <div className="container mt-4">
        <Table hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
            </tr>
            </thead>
            <tbody>
            {clients.map(client => (
                <tr key={client._id} onClick={() => { setSelectedClient(client); toggle(); }}>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.city}</td>
                </tr>
            ))}
            </tbody>
        </Table>

        {/* Modal for displaying client details */}
        {selectedClient && (
            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Client Details</ModalHeader>
            <ModalBody>
                <p><strong>Name:</strong> {selectedClient.name}</p>
                <p><strong>Phone:</strong> {selectedClient.phone}</p>
                <p><strong>Barangay:</strong> {selectedClient.barangay}</p>
                <p><strong>City:</strong> {selectedClient.city}</p>
                <p><strong>Address:</strong> {selectedClient.address}</p>
                <p><strong>Facebook:</strong> <a href={selectedClient.facebookLink} target="_blank" rel="noopener noreferrer">{selectedClient.facebookLink}</a></p>
                <p><strong>Notes:</strong> {selectedClient.notes}</p>
            </ModalBody>
            </Modal>
        )}
        </div>
        </>
    );
}

export default ClientManagement;
