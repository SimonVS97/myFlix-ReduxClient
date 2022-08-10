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
              <Card>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Img variant="top" src={movie.ImagePath}></Card.Img>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="primary">Director</Button>
                  </Link>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="primary">Genre</Button>
                  </Link>
                  <Button variant="primary" type="submit" onClick={() => { onBackClick(); }}>Back</Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      addToFavorites(user, movie._id, token);
                      this.showAddToast()
                    }}>
                    Add to Favorites
                  </Button>
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