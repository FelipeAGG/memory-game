import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import QuestionMark from './questionMark.svg'

function GameCard({data, isFlipped, onClick}) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} key={data.uuid} className="d-flex align-items-stretch">
      <Card onClick={() => onClick(data)} className={`card-container ${isFlipped ? 'flipped' : ''}`}>
        <Card.Img as={Image} src={isFlipped ? data.image : QuestionMark} fluid={true} alt={data.name} />
        {/*<Card.ImgOverlay>
          <Card.Title>{data.name}</Card.Title>
        </Card.ImgOverlay> */}
      </Card>
    </Col>
  );
}

export default GameCard;