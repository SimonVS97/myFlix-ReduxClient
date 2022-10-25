import React, { useState } from 'react';
import { Button, Form, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './register-view.scss';


export function RegisterView(props) {
  [username, setUsername] = useState('');
  [password, setPassword] = useState('');
  [email, setEmail] = useState('');
  [birthday, setBirthDay] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // function to validate user input
  const validate = () => {
    let isRegis = true;
    if (!username) {
      setUsernameErr('Username Required');
      isRegis = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isRegis = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isRegis = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isRegis = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isRegis = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('The input is not an email address');
      isRegis = false;
    }
    return isRegis;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // registration info validation
    const isRegis = validate();
    if (isRegis) {
      /* Send a request to the server for authentication */
      axios.post('https://movie-app-svs.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          // response object, data is the parsed response body
          const data = response.data;
          console.log(data);
          // the second argument '_self' is necessary so that the page will open in the current tab
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('error registering user')
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
                  <Card.Title>Please Register</Card.Title>
                  <Form.Group>
                    <Form.Label> Username:</Form.Label >
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter a username"
                      required>
                    </Form.Control>
                    <p className="input--error">{usernameErr && usernameErr}</p>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Enter a password">
                    </Form.Control>
                    <p className="input--error">{passwordErr && passwordErr}</p>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>E-Mail:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Enter an e-mail">
                    </Form.Control>
                    <p className="input--error">{emailErr && emailErr}</p>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date of birth:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={e => setBirthDay(e.target.value)}
                      required
                    >
                    </Form.Control>
                  </Form.Group>
                  <br></br>
                  <Button type="submit" variant="primary" onClick={handleSubmit}>Submit</Button>
                  <Link to={`/`}>
                    <Button variant='primary'>Log-In</Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container >
  )
}

