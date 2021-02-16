import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'urql'
import {Card,Form, Button, Container, Alert, Col, Row} from 'react-bootstrap';

import { setToken } from '../token'
import '../App.css'

export const Login = props => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [data, login] = useMutation(`
    mutation ($username: String!, $password: String!) {
           tokenAuth(username: $username, password: $password){
             token
           }
       }
  `);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    login({ username, password }).then(({ data }) => {
      if (data.tokenAuth) {
        setToken(data.tokenAuth.token);
        props.history.push('/')
      }
    })
  }


    return (
        <Container>
          <Card style={{ width: '40rem' }} bg='secondary'>
            <Card.Body>
          <Form onSubmit={handleSubmit}>
              <Row className="text-center">
                  <Col xs='auto'>
                    <Form.Control value={username}
                        onChange = {e=>setUsername(e.target.value)}
                        type="text"
                        placeholder="Your username"/>
                  </Col>
                  <Col xs='auto'>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Your password"/>
                  </Col>
                  
                  <Col xs='auto'>
                  <Button type="submit"
                  disabled={data.fetching}
                  // onClick={mutate}
                  >
                      {"Login"}
                  </Button>
                  </Col>
                </Row>

              <Row>
                
                  <Col>
                  <Button
                      type="button"
                      disabled={data.fetching}
                      onClick = {()=>props.history.push('/signup')}
                      >
                          {'need to create an account?'}
                  </Button>
                  </Col>
              </Row>
          </Form>
          </Card.Body>
        </Card>
        </Container>
  )
}
export default Login