const { EventService } = require("../services/event.service")



const createEvent = async (req, res) => {
    const doc = req.body
    doc.user = req.params.user_id
    const one = await EventService.create(doc)
    res.json(one)
}

const getOneEvent = async (req, res) => {
    const result = await EventService.getOne(req.params._id)
    res.json(result)
}

const getAllEvents = async (req, res) => {
    const result = await EventService.getAll()
    res.json(result)

}

const getAllEventsByUserID = async (req, res) => {
    const result = await EventService.getAllByUserID(req.params.user_id)
    res.json(result)

}

const updateEvent = async (req, res) => {
    const result = await EventService.update(req.params._id, req.body)
    res.json(result)
}

const removeEvent = async (req, res) => {
    const result = await EventService.remove(req.params._id)
    res.json(result)
}

const getAllNewEvents = async (req, res) => {
    const result = await EventService.getAllNew()
    res.json(result)
}

const getAllOldEvents = async (req, res) => {
    const result = await EventService.getAllOld()
    res.json(result)
}

const getAllByCityName = async (req, res) => {
    const result = await EventService.getAllByLocation(req.query.city_name)
    res.json(result)
}

const getAllByTitle = async (req, res) => {
    const result = await EventService.getAllByTitle(req.query.title)
    res.json(result)
}



module.exports.EventController = {
    createEvent,
    getAllEvents,
    getOneEvent,
    getAllEventsByUserID,
    updateEvent,
    removeEvent,
    getAllNewEvents,
    getAllOldEvents,
    getAllByCityName,
    getAllByTitle,
}
