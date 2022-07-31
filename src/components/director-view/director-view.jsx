import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {


  render() {
    const director = this.props.director;
    const directormovies = this.props.directormovies;
    console.log(directormovies);





    return (

      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>{director.Name}</Card.Title>
                  <Card.Text>Born in {director.Birth}</Card.Text>
                  <Card.Text>{director.Bio}</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>

        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Some movies from this director</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {directormovies.map(movie => (
            <Col md={4}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container >

    )

  }

}

/* 
                  <Card.Text>{directorMovies[0]}</Card.Text>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                  <Button variant="primary" type="submit" onClick={() => { onBackClick(); }}>Back</Button>
                  */