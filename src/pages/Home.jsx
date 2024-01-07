import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Alert, Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { EventService } from '../services/api/requests/events/events.index'
import { useQuery } from 'react-query'
import { CardsList } from '../components/CardsList'

const Home = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  const [isRemoved, setIsRemoved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  //const q = useQuery('events', async () => await EventService.getAllEvents())
  /*
    const queryGetAllEvents = useQuery({
      queryKey: ['events'],
      queryFn: async () => await EventService.getAllEvents()
    })*/

  //const queryAllEvents = () => q.data

  const [events, setEvents] = useState()



  useEffect(() => {
    //setEvents(queryAllEvents())
  })


  useEffect(() => {
    if (isRemoved) {
      //fetchAllEvents()
      //setEvents(queryAllEvents())
    }

  }, [isRemoved])

  useEffect(() => {
    fetchAllEvents()
  }, [])

  const fetchAllEvents = async () => {

    setIsLoading(true)

    const docs = await EventService.getAllEvents()
    if (docs) {
      setIsLoading(false)
      console.log("all events docs:", docs)
      setEvents(docs)
    }


  }

  const navTo = (e, route_name, id) => {
    e.preventDefault()
    navigate("/" + route_name + "/" + id, { state: { _id: id } })
  }

  const remove = async (e, _id) => {
    e.preventDefault()
    const removed = await EventService.removeEventById(_id)
    if (removed) {
      console.log("removed event: ", removed)
      setIsRemoved(true)
      //q.refetch()
      fetchAllEvents()
    } else {
      setIsRemoved(false)
    }
  }

  return (
    <div>
      <Container>
        <h5>Home</h5>


        {isRemoved && <Alert className='mt-3' variant='success'>success</Alert>}

        {/*q.isLoading && "loading"*/}
        {/*q.error && "error"*/}
        {/*!q.isLoading*/ !isLoading && events &&

          <CardsList events={events} navTo={navTo} remove={remove} user={user} />

        }



      </Container>
    </div>
  )
}


const ListCards = () => (
  <Row xs={1} md={2} className="g-4">
    {Array.from({ length: 15 }).map((i, idx) => (
      <Col key={i} style={{ width: '20rem' }}>
        <Card >
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>

            <div>
              <Button size='sm'>Show More</Button>
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

export default Home
