import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MessageModal(props) {
  const { onCloseGame, onRestartGame, show } = props;
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Congratulations!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You won the memory game!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRestartGame}>
          Restart Game
        </Button>
        <Button variant="primary" onClick={onCloseGame}>
          Close Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;