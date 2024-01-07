import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, Card, } from 'react-bootstrap'
import { EventForm } from '../components/EventForm'
import { useAuth } from '../hooks/useAuth'
import { EventService } from '../services/api/requests/events/events.index'
import { useLocation } from 'react-router-dom'


const EditEvent = () => {

  const { state: state_params } = useLocation()
  const [id, setId] = useState(state_params._id)


  const [state, setState] = useState()

  const [isRegistered, setIsRegistered] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log("state: ", state)

  }, [state])

  useEffect(() => {

    if (id) {
      fetchEvent()
    }

  }, [id])

  const fetchEvent = async () => {
    const doc = await EventService.getEventById(id)
    console.log("fetch event doc: ", doc)
    setState(doc)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = state
    console.log("final state:", obj)

    const new_doc = await EventService.patchEventById(id, obj)
    console.log("created event:", new_doc)
    if (new_doc) {
      setIsRegistered(Boolean(new_doc))
      setIsError(false)
      // e.target.reset()
    } else {
      setIsRegistered(false)
      setIsError(true)
    }


  }




  return (
    <div>


      <EventForm handleSubmit={handleSubmit}
        state={state}
        setState={setState}
        title_form='Edit Event'
        isRegistered={isRegistered}
        isError={isError}
        errorMessage="You are didn't update your Event!!"
        successMessage="You are updated your Event!!"
      />
    </div>
  )
}

export default EditEvent
