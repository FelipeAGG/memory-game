import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MessageModal(props) {
  const { onCloseGame, onRestartGame, show } = props;
  const [playerName, setPlayerName] = useState('')
  useEffect(() => {
    const localUserName = localStorage.getItem("userName");
    if(localUserName){
      setPlayerName(localUserName);
    }
  }, [])
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
        <Modal.Title>Congratulations {playerName}!</Modal.Title>
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