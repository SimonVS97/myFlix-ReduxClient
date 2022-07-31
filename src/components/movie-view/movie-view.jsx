import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


import { Link } from 'react-router-dom';


import './movie-view.scss';

export class MovieView extends React.Component {




  render() {
    const movie = this.props.movie;
    const onBackClick = this.props.onBackClick;
    const token = this.props.token;
    const user = this.props.user;
    const addToFavorites = this.props.addToFavorites;
    console.log(user);
    console.log(token);
    console.log(movie);

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Img variant="top" src={movie.ImagePath}></Card.Img>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                  <Button variant="primary" type="submit" onClick={() => { onBackClick(); }}>Back</Button>
                  <Button variant="primary" onClick={() => addToFavorites(user, movie._id, token)}>Add to Favorites</Button>
                </Card.Body>
              </Card>
            </CardGroup>
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