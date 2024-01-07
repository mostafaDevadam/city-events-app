import React from 'react'
import {  Badge, Button, Card, Col, Row } from 'react-bootstrap'

export const CardsList = ({ events, navTo, remove, user, page_name="no" }) => (
    <Row xs={1} md={2} className="g-4">
      {events.map((item, index) => (
        <Col key={item._id} style={{ width: '20rem' }}>
          <Card >
            {/*<Card.Img variant="top" src="holder.js/100px160" />*/}
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.description}
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <div>
              </div>
              <div>
                <Badge className='bg-success'>{item.date}</Badge> <Badge>{item.location}</Badge>
              </div>

              <div className='d-flex justify-content-start gap-4 mt-3'>
                <Button size='sm' onClick={(e) => navTo(e, "event", item._id)}>Show More</Button>

                {item.user == user._id && page_name === "show-event" && (
                  <>
                    <Button size='sm' className='bg-info' onClick={(e) => navTo(e, "edit", item._id)}>Edit</Button>
                    <Button size='sm' className='bg-danger' onClick={(e) => remove(e, item._id)}>Remove</Button>
                  </>
                )}
              </div>
            </Card.Body>
            {
              /*<Card.Footer>
                 footer
        </Card.Footer>*/
            }
          </Card>
        </Col>
      ))}
    </Row>
  )
