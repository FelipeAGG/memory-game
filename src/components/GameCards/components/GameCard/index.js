import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import QuestionMark from './questionMark.svg'

function GameCard({data, isFlipped, onClick}) {
  return (
    <Col key={data.uuid} className="d-flex justify-content-center">
      <Card 
        data-testid={data.name}
        onClick={() => onClick(data)} 
        className={`card-container ${isFlipped ? 'flipped' : ''}`}>
          <Card.Img as={Image} src={isFlipped ? data.image : QuestionMark} fluid={true} alt={data.name} />
      </Card>
    </Col>
  );
}

export default GameCard;