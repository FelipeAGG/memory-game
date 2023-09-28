import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import GameCard from './components/GameCard';
import MessageModal from './components/MessageModal';
import NumberDropdown from './components/NumberDropdown';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const urlPath = "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries";

const GameCards = ({resetGame}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [matchedCards, setMatchedCards] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [numberCards, setNumberCards] = useState(5);
  
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
    setFlippedCards([]);
    setMatches(0);
    setMatchedCards([]);
    setModalShow(false);
  }

  const formatCards = (cardList) => {
    const mappingCards = cardList.data.entries.map(img => (
      { 
        image: img.fields.image.url, 
        name: img.fields.image.title, 
      }
    ))
    // Duplicar las cartas para que haya pares
    const duplicatedCards = [...mappingCards, ...mappingCards].map(dc => ({ ...dc, uuid: uuidv4() }));
    // Barajar las cartas.
    return shuffleArray(duplicatedCards);
  }

  useEffect(() => {
    const getCards = async() => {
      const response = await axios.get(urlPath, {
        params: {
          per_page: numberCards
        }
      })
      setCards(formatCards(response));
    }
    getCards();
    handleResetValue();
  }, [numberCards]);

  useEffect(() => {
    if(matchedCards.length && matchedCards.length === cards.length){
      setModalShow(true);
    }
  }, [matchedCards])

  useEffect(() => {
    const getCards = async() => {
      const response = await axios.get(urlPath, {
        params: {
          per_page: numberCards
        }
      })
      setCards(formatCards(response));
    }
    getCards();
  }, []);

  return (
    <Container>
      {modalShow && <MessageModal
        show={modalShow}
        onCloseGame={resetGame} 
        onRestartGame={handleResetValue}
      />}
      <Row className='justify-content-between'>
        <Col className='col-auto mr-auto'>
          <div class="card" style={{width: "18rem"}}>
            <div class="card-header">
              Stats
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Matches: {matches}</li>
              <li class="list-group-item">Errors: {errorCount}</li>
              <li class="list-group-item">Total attempts: {matches + errorCount}</li>
            </ul>
          </div>
        </Col>
        <Col className='col-auto'>
          <div class="card" style={{width: "18rem"}}>
            <div class="card-header">
              Options
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <NumberDropdown setNumberCards={setNumberCards} numberCards={numberCards} />
              </li>
              <li class="list-group-item">
                <ButtonGroup vertical>
                  <Button variant="danger" onClick={handleResetValue}>
                    Reset Game
                  </Button>
                  <Button variant="danger" onClick={resetGame}>
                    Exit Game
                  </Button>
                </ButtonGroup>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="cards-content d-flex justify-content-center">
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