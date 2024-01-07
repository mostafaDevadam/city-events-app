const { EventController } = require('../controllers/event.controller')

const router = require('express').Router()

router.post('/create/:user_id', EventController.createEvent)
router.get('/all', EventController.getAllEvents)
router.get('/:_id', EventController.getOneEvent)
router.get('/all/user/:user_id', EventController.getAllEventsByUserID)
router.patch('/update/:_id', EventController.updateEvent)
router.delete('/remove/:_id', EventController.removeEvent)
router.get('/all/new', EventController.getAllNewEvents)
router.get('/all/old', EventController.getAllOldEvents)
router.get('/all/location', EventController.getAllByCityName)
router.get('/all/title', EventController.getAllByTitle)



module.exports.EventRouter = router
