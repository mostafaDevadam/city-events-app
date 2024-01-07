import React from 'react'
import { Button, Form, Row, Col, Card, Alert, } from 'react-bootstrap'

export const EventForm = ({ handleSubmit, title_form = "title form", button_title = "SAVE", state = {}, setState, isRegistered = false, isError = false,
errorMessage = "You are created a New Event!!",
successMessage = " Error: Your Event didn't create!!",

}) => {


  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.title)
    setState((prev) => { return { ...prev, ...{ [e.target.id]: e.target.value } } })
  }


  return (
    <div>
      <Row xs={1} md={2} className="g-4 mt-4 ">

        <Col style={{ width: '45rem' }} className='mx-auto'>
          <Card >
            <Card.Title className='mx-auto mt-3'>
              <h5>{title_form}</h5>
            </Card.Title>
            <Card.Body>

              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" title="title" controlId="title">
                  <Form.Label column sm="2">
                    Title
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type='title' placeholder='title' defaultValue={state && state.title} onChange={handleChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                  <Form.Label column sm="2">
                    Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type='description' placeholder='description' defaultValue={state && state.description} onChange={handleChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="date">
                  <Form.Label column sm="2">
                    Date
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type='date' placeholder='date' defaultValue={state && state.date} onChange={handleChange} />
                  </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" controlId="location">
                  <Form.Label column sm="2">
                    Location
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type='location' placeholder='location' defaultValue={state && state.location} onChange={handleChange} />
                  </Col>
                </Form.Group>




                <Form.Group className='d-flex justify-content-end'>
                  <Button type="submit">{button_title}</Button>

                </Form.Group>


              </Form>


            </Card.Body>
          </Card>
          {isRegistered && <Alert className='mt-3' variant='success'>{successMessage}</Alert>}
          {isError && <Alert className='mt-3' variant='danger'> {errorMessage}</Alert>}
        </Col>
      </Row>
    </div>
  )
}

