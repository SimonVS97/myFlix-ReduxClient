import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
}

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;
}