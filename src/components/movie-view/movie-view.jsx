import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

import { Link } from 'react-router-dom';


import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      showAddToast: false
    }
  }

  //set showAddToast to true
  showAddToast() {
    this.setState({
      showAddToast: true
    })
    setTimeout(() => {
      this.setState({
        showAddToast: false
      })
    }, 5000);
  }

  render() {
    const movie = this.props.movie;
    const onBackClick = this.props.onBackClick;
    const token = this.props.token;
    const user = this.props.user;
    const addToFavorites = this.props.addToFavorites;
    const showAddToast = this.state.showAddToast;

    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <CardGroup>
              <Card className="bg-dark text-white vh-500">
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Img variant="top" src={movie.ImagePath}></Card.Img>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Button

                    className='buttonAddToFav'
                    variant='outline-secondary'
                    onClick={() => {
                      addToFavorites(user, movie._id, token);
                      this.showAddToast()
                    }}>
                    Add to Favorites
                  </Button>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant='outline-secondary' className="buttonDirector">Director</Button>
                  </Link>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button className="buttonGenre" variant='outline-secondary'>Genre</Button>
                  </Link>
                  <Button className="buttonBack" variant='outline-secondary' type="submit" onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <ToastContainer className="fixed-top top-0 start-50">
              <Toast show={showAddToast} bg={'success'}>
                <Toast.Body>You added this movie to your list of favorites</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>

    );
  }
}

MovieView.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};