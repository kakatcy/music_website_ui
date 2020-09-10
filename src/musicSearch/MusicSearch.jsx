import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Button, Card, Row, Col,Tooltip, OverlayTrigger } from 'react-bootstrap';
import './MusicSearch.css';

function MusicSearch(props) {
  const location = useLocation();
  const history = useHistory();
  const info = location.state;

  const onCardClick = (item) => {
    if (item) {
      let path = {
        pathname: '/musicInfo',
        state: item,
      }
      history.push(path);
    }
  }

  const cards = info.map((item, key) => {
    return (
      <Card className="musicCard" onClick={() => {onCardClick(item)}} key={key} bg="dark">
        <Card.Img className="musicImg" variant="top" src={item.thumbnail} />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted subtitle">{item.author}</Card.Subtitle>
          <Card.Text style={{ fontSize: '0.5em' }}>{item.title}</Card.Text>
        </Card.Body>
      </Card>
    );
  })

  return (
    <Container className="musicSearch">
      <Row>
        <Col>
          <Button onClick={() => history.push('/music')} style={{ backgroundColor: '#464f61', color: 'white', borderColor: '#465060', marginBottom:'6px', float: 'left' }}>
            <OverlayTrigger
                key={'prepage'}
                placement={'bottom'}
                overlay={
                  <Tooltip id={'prepage'}>
                    prev page
                  </Tooltip>
                }
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                <path fill="white" fillRule="evenodd" d="M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L6.06 8l3.72 3.72a.75.75 0 010 1.06z"></path>
              </svg>
            </OverlayTrigger>
          </Button>
        </Col>
      </Row>
      <Row>
        {cards.map((card, index) => {
          return (
            <Col xs={6} sm={4} key={index} >
              {card}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default MusicSearch