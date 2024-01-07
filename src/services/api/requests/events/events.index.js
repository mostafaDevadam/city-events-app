import { createEventByUserID } from "./createEventByUserID"
import { getAllEvents } from "./getAllEvents"
import { getAllEventsByUserID } from "./getAllEventsByUserID"
import { getEventById } from "./getEventById"
import { patchEventById } from "./patchEventById"
import { removeEventById } from "./removeEventById"



export const EventService = {getAllEvents, getEventById, createEventByUserID,
    patchEventById, removeEventById, getAllEventsByUserID }
