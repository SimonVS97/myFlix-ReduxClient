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
  constructor() {
    super();
    this.state = {
      showMovies: false
    }
  }

  //set showMovies to true
  showMovies() {
    if (!this.state.showMovies) {
      this.setState({
        showMovies: true
      })
    } else {
      this.setState({
        showMovies: false
      })
    }
  }


  render() {
    const director = this.props.director;
    const directormovies = this.props.directormovies;
    const showMovies = this.state.showMovies;
    console.log(directormovies);
    console.log(showMovies);


    return (
      <>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Born in {director.Birth}</Card.Text>
              <Card.Text>{director.Bio}</Card.Text>
              <Link to={`/`}>
                <Button variant="primary">Back</Button>
              </Link>
              <Button onClick={() => this.showMovies()}>Directed Movies</Button>
            </Card.Body>
          </Card>
        </CardGroup>
        {showMovies ?
          <Card>
            <Card.Body>
              <Card.Title>Directed Movies</Card.Title>
            </Card.Body>
          </Card>
          : <div></div>}
        {showMovies ?
          <Row>
            {

              directormovies.map(movie => (
                <Col md={4}>
                  <MovieCard movie={movie} />
                </Col>
              ))

            }
          </Row>
          : <div></div>}
      </>
    )
  }
}