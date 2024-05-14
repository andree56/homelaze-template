import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody,
  Button, FormGroup, Label, Input, Container
} from 'reactstrap';
import { FaEllipsisV } from 'react-icons/fa';
import SimpleHeader from 'components/Headers/SimpleHeader';

function TherapistSchedules() {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [modal, setModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/therapists')
      .then(response => setTherapists(response.data))
      .catch(error => console.error('Error fetching therapists:', error));
  }, []);

  const toggleOptionsModal = () => setOptionsModal(!optionsModal);
  const toggleModal = () => setModal(!modal);

  const handleEdit = (therapist) => {
    setSelectedTherapist(therapist);
    setEditMode(true);
    toggleModal();
    setOptionsModal(false); // Close options modal
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/therapists/${selectedTherapist._id}`)
      .then(() => {
        const updatedTherapists = therapists.filter(t => t._id !== selectedTherapist._id);
        setTherapists(updatedTherapists);
        toggleOptionsModal();
        alert('Therapist deleted successfully');
      })
      .catch(error => console.error('Error deleting therapist:', error));
  };

  const saveTherapist = () => {
    const method = editMode ? axios.put : axios.post;
    const url = `http://localhost:5000/api/therapists/${editMode ? selectedTherapist._id : ''}`;
    method(url, selectedTherapist)
      .then(() => {
        toggleModal();
        alert(`Therapist ${editMode ? 'updated' : 'added'} successfully`);
      })
      .catch(error => console.error(`Error ${editMode ? 'updating' : 'adding'} therapist:`, error));
  };

  return (
    <>
      <SimpleHeader title="Therapist Management" />
      <Container className="mt-4">
        <h2>Therapists</h2>
        {therapists.map(therapist => (
          <Card key={therapist._id}>
            <CardBody>
              <CardHeader>
                {therapist.name}
                <Button color="link" onClick={() => { setSelectedTherapist(therapist); toggleOptionsModal(); }} className="float-right">
                  <FaEllipsisV />
                </Button>
              </CardHeader>
            </CardBody>
          </Card>
        ))}
        <Button color="primary" onClick={() => { setSelectedTherapist({ name: '', services: [], availability: {}, color: '#FFFFFF' }); setEditMode(false); toggleModal(); }}>Add Therapist</Button>
      </Container>

      {selectedTherapist && (
        <>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{editMode ? 'Edit Therapist' : 'Add Therapist'}</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="therapistName">Name</Label>
                <Input
                  type="text"
                  id="therapistName"
                  value={selectedTherapist.name}
                  onChange={e => setSelectedTherapist({ ...selectedTherapist, name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="therapistServices">Services</Label>
                <Input
                  type="select"
                  id="therapistServices"
                  multiple
                  value={selectedTherapist.services}
                  onChange={e => setSelectedTherapist({ ...selectedTherapist, services: [...e.target.selectedOptions].map(o => o.value) })}
                >
                  {['Massage', 'Therapy', 'Counseling'].map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </Input>
              </FormGroup>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <FormGroup key={day}>
                  <Label for={`availability-${day}`}>{day.charAt(0).toUpperCase() + day.slice(1)}</Label>
                  <Input
                    type="text"
                    id={`availability-${day}`}
                    value={selectedTherapist.availability[day]?.join(', ') || ''}
                    placeholder="e.g. 09:00-12:00, 14:00-18:00"
                    onChange={e => setSelectedTherapist({
                      ...selectedTherapist,
                      availability: {
                        ...selectedTherapist.availability,
                        [day]: e.target.value.split(',').map(time => time.trim())
                      }
                    })}
                  />
                </FormGroup>
              ))}
              <Button color="primary" onClick={saveTherapist}>{editMode ? 'Update' : 'Add'}</Button>
            </ModalBody>
          </Modal>

          <Modal isOpen={optionsModal} toggle={toggleOptionsModal}>
            <ModalHeader toggle={toggleOptionsModal}>Manage Therapist</ModalHeader>
            <ModalBody>
              <Button color="secondary" onClick={() => handleEdit(selectedTherapist)} block>Edit</Button>
              <Button color="danger" onClick={handleDelete} block>Delete</Button>
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
}

export default TherapistSchedules;
