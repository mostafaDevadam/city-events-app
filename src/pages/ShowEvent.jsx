import React, { useEffect, useState } from 'react'
import { EventService } from '../services/api/requests/events/events.index'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Badge, Button, Card, Col, Modal, Row, Stack } from 'react-bootstrap'
import { CustomModal } from '../components/CustomModal'

const ShowEvent = () => {

    const { state } = useLocation()
    const [id, setId] = useState(state._id)
    const [eventDoc, setEventDoc] = useState()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = async (val) => {
        setShow(false);
        if(val){
            // remove
            console.log("remove fro modal: ", val)
            await EventService.removeEventById(eventDoc._id)
            //
            fetchEvent()
        }
    }
    const handleShow = () => setShow(true);


    useEffect(() => {
        fetchEvent()
    }, [eventDoc])

    const fetchEvent = async () => {
        const doc = await EventService.getEventById(state._id)
        console.log("event doc: ", doc)
        setEventDoc(doc)
    }


    const navTo = (e, route_name, id) => {
        e.preventDefault()
        navigate("/" + route_name + "/" + id, { state: { _id: id } })
    }

    const remove = (e, _id) => {
       handleShow(e)
    }

    const closeModal = (e) => {

    }



    return (
        <div>

            <CustomModal show={show} handleClose={handleClose}  />

            {eventDoc &&
                <Row xs={1} md={2} className="g-4 justify-content-center mt-3">
                    <Col key={"item._id"} style={{ width: '40rem' }}>
                        <Card>
                            <Card.Header>
                                <Card.Title className='text-center'>
                                    <p>{eventDoc.title}</p>
                                </Card.Title>
                            </Card.Header>

                            <Card.Body>
                                <div className='d-flex flex-column gap-3' >
                                    <p>{eventDoc.description}</p>

                                    <Stack direction='vertical' className='d-flex flex-column w-25 gap-2'>
                                        <span bg="secondary">{eventDoc.location}</span>
                                        <Badge bg="success">{eventDoc.date}</Badge>
                                    </Stack>


                                    <div className='d-flex flex-row gap-3'>

                                        {eventDoc.user === user._id &&
                                            (<>
                                                <Button size='sm' className='bg-info' onClick={(e) => navTo(e, "edit", eventDoc._id)}>Edit</Button>
                                                <Button size='sm' className='bg-danger' onClick={(e) => remove(e, eventDoc._id)}>Remove</Button>
                                            </>)
                                        }

                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            }

        </div>
    )
}

export default ShowEvent


