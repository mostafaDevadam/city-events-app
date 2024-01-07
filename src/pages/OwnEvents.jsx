import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { EventService } from '../services/api/requests/events/events.index'
import { useNavigate } from 'react-router-dom'
import { CardsList } from '../components/CardsList'

const OwnEvents = () => {

  const { user } = useAuth()

  const navigate = useNavigate()

  const [isRemoved, setIsRemoved] = useState(false)
  const [events, setEvents] = useState()
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    fetchAllEventsByUserID()
  }, [])

  const fetchAllEventsByUserID = async () => {
    setIsLoading(true)
    await EventService.getAllEventsByUserID(user._id)
      .then(th => {
        if (th) {
          setIsLoading(false)
          console.log("data: ", th)
          setEvents(th)
        }
      })

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
      fetchAllEventsByUserID()
    } else {
      setIsRemoved(false)
    }
  }




  return (
    <div>


      {isLoading && "loading..."}

      <div className='mt-3 p-4'>
        {!isLoading && events &&
          <CardsList events={events} navTo={navTo} remove={remove} user={user} />
        }

      </div>



    </div>
  )
}

export default OwnEvents
