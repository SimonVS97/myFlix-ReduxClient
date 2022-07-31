import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      profile: null,
      favMovies: null,
      username: null,
      password: null,
      email: null,
      birthday: null
    }
  }

  // set Username of info to be updated
  setUsername(newUsername) {
    this.setState({
      username: newUsername
    });
  }
  // set Password of info to be updated
  setPassword(newPassword) {
    this.setState({
      password: newPassword
    });
  }

  // set Email of info to be updated
  setEmail(newEmail) {
    this.setState({
      email: newEmail
    });
  }

  // set birthday of info to be updated
  setBirthday(newBirthday) {
    this.setState({
      birthday: newBirthday
    });
  }

  // set favMovies
  setFavMovies(newFavMovies) {
    this.setState({
      favMovies: newFavMovies
    })
  }

  // function to validate user input
  validate = () => {
    let isRegis = true;
    if (!this.state.username) {
      alert('Username Required');
      isRegis = false;
    } else if (this.state.username.length < 2) {
      alert('Username must be 2 characters long');
      isRegis = false;
    }
    if (!this.state.password) {
      alert('Password Required');
      isRegis = false;
    } else if (this.state.password.length < 6) {
      alert('Password must be 6 characters long');
      isRegis = false;
    }
    if (!this.state.email) {
      alert('Email required');
      isRegis = false;
    } else if (this.state.email.indexOf('@') === -1) {
      alert('The input is not an email address');
      isRegis = false;
    }
    return isRegis;
  }

  // Get info on the user, user is passed as an parameter into method
  getUserInfo(user, token) {
    axios.get(`https://movie-app-svs.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        profile: response.data
      })
    })
  }

  // Filter the favorite movies of the user 
  getUserFavMovies() {
    const favMovies = this.state.profile.FavoriteMovies;
    const movies = this.props.movies;
    let favMoviesArr = this.state.favMovies;

    favMoviesArr = favMovies.map(movieId => {
      return movies.find(m => m._id == movieId)
    })
    this.setFavMovies(favMoviesArr);
  }

  // put request to server to update user information
  changeUserInfo(user, token) {
    console.log('hello');
    const isRegis = this.validate();
    if (isRegis) {
      axios.put(`https://movie-app-svs.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } },
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday
        }
      ).then(response => {
        console.log(response.data);
        window.open('/', '_self');
      }).catch(error => {
        console.error(error);
      })
    } else {
      alert('wrong input');
    }
  }
  // Get profile info from user after mounting component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = this.props.user;
    this.getUserInfo(user, accessToken);
  }

  // method that sends delete request
  deleteUser(user, token) {
    console.log(user);
    axios.delete(`https://movie-app-svs.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      console.log(response.data);
      window.open('/', '_self');
    }).catch(error => {
      console.error(error);
    })
  }

  // method that sends delete request to delete movie from favorites
  deleteFavMovie(user, movieID, token) {
    axios.delete(`https://movie-app-svs.herokuapp.com/users/${user}/movies/${movieID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      this.setState({
        profile: response.data
      })
    })
  }

  render() {
    const user = this.props.user;
    const movies = this.props.movies;
    const token = localStorage.getItem('token');
    const profile = this.state.profile;
    const favMovies = this.state.favMovies;



    console.log('array', favMovies);
    console.log(profile);

    return (
      <Container>
        <Row>
          <Col>
            {profile ? (
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title>Profile information</Card.Title>
                    <Card.Text>Username: {profile.Username}</Card.Text>
                    <Card.Text>Email: {profile.Email}</Card.Text>
                    <Card.Text>Date of Birth: {profile.Birthday}</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Form>
                    <Card.Title>Update your profile information</Card.Title>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type="text" onChange={e => this.setUsername(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" onChange={e => this.setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" onChange={e => this.setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control type="date" onChange={e => this.setBirthday(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="submit" onClick={() => this.changeUserInfo(user, token)}>Submit</Button>
                    <Button type="submit" variant="primary" onClick={() => this.deleteUser(user, token)}>Deregister</Button>
                    <Button onClick={() => this.getUserFavMovies()}>FavMovies</Button>
                    <Link to={`/`}>
                      <Button variant="link">back</Button>
                    </Link>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        {favMovies !== null &&
          favMovies.map(m => (
            <Col md={4}>
              <MovieCard
                favMovies={favMovies}
                movie={m}
                token={token}
                user={user}
                key={m._id}
                deleteFavMovie={(user, movieID, token) => this.deleteFavMovie(user, movieID, token)}>
              </MovieCard>
            </Col>
          ))
        }
      </Container>
    )
  }
}

