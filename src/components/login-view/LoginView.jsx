import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const onRegisterClick = props.onRegisterClick;

  // function to validate user input
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsername('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // validate input
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://movie-app-svs.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          // response object, data is the parsed response body
          /* then call props.onLoggedIn(data) */
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Form>
                  <Card.Title>Please Log-In</Card.Title>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)}></Form.Control>
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <br></br>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                  <Button varaint="primary" onClick={() => { onRegisterClick(); }}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );

}

LoginView.PropTypes = {
  onRegisterClick: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
}; 
