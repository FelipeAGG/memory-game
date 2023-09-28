import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GameCard from './components/GameCard';
import MessageModal from './components/MessageModal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const urlPath = "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=3";

const GameCards = ({resetGame}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [matchedCards, setMatchedCards] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 0) {
      setFlippedCards([card]);
    } else if (flippedCards.length === 1 && flippedCards[0] !== card) {
      setFlippedCards([...flippedCards, card]);
      setTimeout(() => {
        if (flippedCards[0].name === card.name) {
          setMatchedCards([...matchedCards, ...flippedCards, card]);
          setMatches(matches + 1);
        }else{
          setErrorCount(errorCount + 1)
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  const handleResetValue = () => {
    setFlippedCards([])
    setMatches(0)
    setMatchedCards([])
    setModalShow(false)
  }

  useEffect(() => {
    if(matchedCards.length && matchedCards.length === cards.length){
      setModalShow(true);
    }
  }, [matchedCards])

  useEffect(() => {
    const getCards = async() => {
      const response = await axios.get(urlPath);
      const mappingCards = response.data.entries.map(img => (
        { 
          image: img.fields.image.url, 
          name: img.fields.image.title, 
        }
      ))
      // Duplicar las cartas para que haya pares
      const duplicatedCards = [...mappingCards, ...mappingCards].map(dc => ({ ...dc, uuid: uuidv4() }));
      // Barajar las cartas.
      const shuffledCards = shuffleArray(duplicatedCards);
      setCards(shuffledCards);
    }
    getCards();
  }, []);

  return (
    <Container>
      <MessageModal
        show={modalShow}
        onCloseGame={resetGame} 
        onRestartGame={handleResetValue}
      />
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          Aciertos: {matches}
        </Col>
        <Col md="auto">
          Errores: {errorCount}
        </Col>
        <Col xs lg="2">
          Total intentos: {matches + errorCount}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <Button variant="danger" onClick={handleResetValue}>
            Reset Game
          </Button>
        </Col>
        <Col xs lg="2">
          <Button variant="danger" onClick={resetGame}>
            Exit Game
          </Button>
        </Col>
        {/* <Col xs lg="2">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Modal
          </Button>
        </Col> */}
      </Row>
      <Row>
        {cards.map((card, index) => (
          <GameCard
            key={index}
            data={card}
            isFlipped={flippedCards.includes(card) || matchedCards.includes(card)}
            onClick={handleCardClick}
          />
        ))}
      </Row>
    </Container>
      
  );
};

export default GameCards;