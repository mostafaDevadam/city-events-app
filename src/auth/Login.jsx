import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthService } from '../services/auth.service'
import axios from 'axios'

import { Button, Form, Row, Col, Card, FormControl, } from 'react-bootstrap'

const base_url = process.env.REACT_APP_API

const u = {
  "email": "test1@sd.de",
  "password": "456456"
}

const u1 = {
  "email": "user1@gmx.de",
  "password": "789759"
}

const u2 = {
  "email": "user2@gmx.de",
  "password": "741741"
}

const u3 = {
  "email": "user3@gmx.de",
  "password": "963963"
}

const Login = () => {

  const { login } = useAuth()

  const [inputs, setInputs] = useState()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleLogin = async (e) => {
    console.log("login inputs: ", inputs)
    const login_inputs = inputs
    await login(login_inputs)

  }

  const handleChange = (e, field_name) => {
    e.preventDefault()
    console.log(e.target.title)
    setInputs((prev) => { return { ...prev, ...{ [e.target.id]: e.target.value } } })
  }



  return (
    <div>


      <Row xs={1} md={2} className="g-4 mt-4 ">

        <Col style={{ width: '40rem' }} className='mx-auto'>
          <Card >
            <Card.Title className='mx-auto mt-3'>
              <h5>Login</h5>
            </Card.Title>
            <Card.Body>

            <Form>
                <Form.Group as={Row} className="mb-3" controlId="email">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type='email' placeholder='E-Mail' title="email" required isInvalid onChange={(e) => handleChange(e, "email")} />
                    <FormControl.Feedback type="invalid">
                      Please write your email
                    </FormControl.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="password">
                  <Form.Label column sm="2" >
                    Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="password" title="password" placeholder="Password" onChange={(e) => handleChange(e, "password")} />
                  </Col>
                </Form.Group>

                <Form.Group className='d-flex justify-content-end'>
                  <Button onClick={handleLogin}>Login</Button>

                </Form.Group>


              </Form>


            </Card.Body>
          </Card>
        </Col>
      </Row>











    </div>
  )
}

export default Login
