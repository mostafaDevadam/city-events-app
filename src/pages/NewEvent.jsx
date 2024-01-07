import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, Card, Alert, } from 'react-bootstrap'
import { EventForm } from '../components/EventForm'
import { EventService } from '../services/api/requests/events/events.index'
import { useAuth } from '../hooks/useAuth'

const default_obj = {
  title: "",
  description: "",
  date: "",
  location: "",
}

const NewEvent = () => {

  const { user } = useAuth()

  const [state, setState] = useState()

  const [isRegistered, setIsRegistered] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log("state: ", state)
  }, [state])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = state
    console.log("final state:", obj)
    console.log("user id:", user._id)
    if (user._id) {
      const new_doc = await EventService.createEventByUserID(user._id, obj)
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
    //setState((prev) => prev.title = "" )
    //setState(default_obj)
  }


  return (
    <div>
      <EventForm handleSubmit={handleSubmit}
        state={state}
        setState={setState}
        title_form='Add New Event'
        isRegistered={isRegistered}
        isError={isError}
      />

    </div>
  )
}

export default NewEvent
