import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';


export class MovieCard extends React.Component {
  addToFav() {

  }

  render() {
    const movie = this.props.movie;
    const onMovieClick = this.props.onMovieClick;
    const token = this.props.token;
    const user = this.props.user;
    const deleteFavMovie = this.props.deleteFavMovie;
    const favMovies = this.props.favMovies;
    console.log(movie._id);


    return (
      <CardGroup className='cardGroup' >
        <Card >
          <Card.Body >
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Img variant="top" src={movie.ImagePath} style={{ height: '70%' }} />
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant='link'>Open</Button>
            </Link>
            {typeof deleteFavMovie === "function" &&
              <Button onClick={() => deleteFavMovie(user, movie._id, token)}>Delete from list of favorites</Button>
            }
          </Card.Body>
        </Card>
      </CardGroup>

    );
  }
}

MovieCard.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

            //<Button onClick={() => onMovieClick(movie)} variant="primary">Open</Button>