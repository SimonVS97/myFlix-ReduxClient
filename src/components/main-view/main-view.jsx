import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/LoginView';
import { RegisterView } from '../register-view/register-view.jsx';
import { Menubar } from '../navbar/navbar.jsx'
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      displayRegisterForm: false
    }
  }


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  /*  componentDidMount() {
      axios.get('https://movie-app-svs.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    } */

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
    /*this.setState({
      user: authData.user.Username
    }); */
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // Logging out function
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // method that will add movie to list of favorites
  addToFavorites(user, movieID, token) {
    fetch(`https://movie-app-svs.herokuapp.com/users/${user}/movies/${movieID}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    /*
        axios.post(`https://movie-app-svs.herokuapp.com/users/${user}/movies/${movieID}`,
          { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          }); */
  }

  getMovies(token) {
    axios.get('https://movie-app-svs.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // a function that will set displayRegisterForm on true
  toRegister() {
    this.setState({
      displayRegisterForm: true
    });
  }

  // Function that will set displayRegisterForm to false
  toLogIn() {
    this.setState({
      displayRegisterForm: false
    })
  }



  render() {
    let movies = this.props.movies;
    const selectedMovie = this.state.selectedMovie;
    const user = this.state.user;
    const displayRegisterForm = this.state.displayRegisterForm;
    const token = localStorage.getItem('token');

    return (
      <Router>
        <Menubar user={user}></Menubar>
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            /* If there is no user, the LoginView is rendered. */
            if (!user) {
              return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={() => { this.toRegister() }} />;
            }
            // Before the movies have been loaded
            if (movies.length === 0) return <div className='main-view'></div>;
            // mapping the movie cards
            return <MoviesList movies={movies} />
          }} />

          <Route path="/register" render={() => {
            // register view
            if (user) return <Redirect to="/" />
            return <RegisterView OnLogInClick={() => { this.toLogIn() }}></RegisterView>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            // movie view
            return <Col md={8}>
              <MovieView
                token={token}
                user={user}
                movie={movies.find(m => m._id === match.params.movieId)}
                addToFavorites={(user, movieID, token) => this.addToFavorites(user, movieID, token)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col >
              <DirectorView
                movies={movies}
                director={movies.find(m => m.Director.Name === match.params.name).Director}
                directormovies={movies.filter(movie => movie.Director.Name === match.params.name)}
                onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <GenreView
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                genremovies={movies.filter(movie => movie.Genre.Name === match.params.name)}
                onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/users/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <ProfileView
                movies={movies}
                user={user}
                onBackClick={() => history.goBack()} />
            </Col>

          }} />
        </Row>
      </Router>
    );
  }
}

// it gets state from store and passes it as props to the component that is connected to store
// we are mapping the state of the store to the main view component
// movies is prop of component main view
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

// connect main view to store
// we need store to map state to props of main
// setMovies is action creator, it is imported
export default connect(mapStateToProps, { setMovies })(MainView);