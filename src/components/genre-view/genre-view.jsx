import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export class GenreView extends React.Component {
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
    const genre = this.props.genre;
    const genremovies = this.props.genremovies;
    const showMovies = this.state.showMovies;

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>{genre.Name}</Card.Title>
                  <Card.Text>{genre.Description}</Card.Text>
                  <Link to={`/`}>
                    <Button variant="primary">Back</Button>
                  </Link>
                  <Button onClick={() => this.showMovies()}>Genre Movies</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        {showMovies ?
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Some movies of this genre
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          : <div></div>}
        {showMovies ?
          <Row>
            {genremovies.map(movie => (
              <Col md={4}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          : <div></div>}
      </Container>
    )

  }

}