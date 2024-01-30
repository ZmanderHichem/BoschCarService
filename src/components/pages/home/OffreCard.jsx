// OffreCard.jsx

import React, { useState } from 'react';
import { Card, Button, Modal, Container } from 'react-bootstrap';

const OffreCard = ({ offre }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    
 
<>
      <Card
        key={offre.id}
        style={{ width: '220px', height: '420px', marginRight: '10px', border: '2px solid black' }}
      >
        <Card.Img variant="top" src={offre.imageUrl} />
        <Card.Body>
          <Card.Title>{offre.title}</Card.Title>
          <Card.Text>{offre.description}</Card.Text>
          <Button variant="primary" onClick={handleOpenModal}>
            Voir détails
          </Button>
        </Card.Body>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{offre.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{offre.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
      </>
  );
};

export default OffreCard;