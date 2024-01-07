import React, { useState } from 'react'
import { AuthService } from '../services/auth.service'

import { Button, Form, Row, Col, Card, Alert, FormControl, } from 'react-bootstrap'


const u = {
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

const Register = () => {

  const [inputs, setInputs] = useState()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleRegister = async (e) => {

    console.log("register inputs: ", inputs)
    const new_doc = inputs
    if (inputs.confirmPassword !== inputs.password) {
      setIsError(true)
      setIsRegistered(false)
    } else {
      //setIsRegistered(true)

      const registered = await AuthService.register(new_doc)
      console.log("registered: ", registered)

      if (registered) {
        setIsRegistered(registered)
        setIsError(false)
      }else{
        setIsRegistered(registered)
        setIsError(true)
      }
    }


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
              <h5>Register</h5>
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

                <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                  <Form.Label column sm="2">
                    Confirm Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="password" title="confirmPassword" placeholder="Confirm Password" onChange={(e) => handleChange(e, "confirmPassword")} />
                  </Col>
                </Form.Group>


                <Form.Group className='d-flex justify-content-end'>
                  <Button onClick={handleRegister}>Register</Button>

                </Form.Group>


              </Form>




            </Card.Body>
          </Card>
          {isRegistered && <Alert className='mt-3' variant='success'> You are registered!!</Alert>}
          {isError && <Alert className='mt-3' variant='danger'> Error: You are not registered!!</Alert>}
        </Col>
      </Row>
    </div>
  )
}

export default Register
