import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import SimpleHeader from 'components/Headers/SimpleHeader';

function TherapistSchedules() {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/therapists')
      .then(response => {
        setTherapists(response.data);
      })
      .catch(error => console.error('Error fetching therapists:', error));
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <AdminNavbar />
      <SimpleHeader />
      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          {therapists.map(therapist => (
            <div className="col-md-8 col-lg-6 col-xl-3 mb-3" key={therapist._id} onClick={() => {
              setSelectedTherapist(therapist);
              toggleModal();
            }}>
              <Card>
                <CardHeader>{therapist.name}</CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>


      {selectedTherapist && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{selectedTherapist.name}</ModalHeader>
          <ModalBody>
            <div>
              <strong>Services:</strong> {selectedTherapist.services.join(', ')}
            </div>
            <div>
              <strong>Availability:</strong>
              {Object.entries(selectedTherapist.availability).map(([day, times]) => (
                <p key={day}>{day}: {times.join(', ')}</p>
              ))}
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

export default TherapistSchedules;
