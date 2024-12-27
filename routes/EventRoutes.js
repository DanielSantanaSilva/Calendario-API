const router = require('express').Router()
const EventController = require('../controllers/EventController')

// middleware
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, EventController.createEvent)
router.get('/getevents', EventController.getAllEvents)
router.get('/myevents', verifyToken, EventController.getUserEvents)
router.get('/:id', EventController.getEventById)
router.patch('/:id', verifyToken, EventController.updateEvent)
router.delete('/:id', verifyToken, EventController.removeEvent)

module.exports = router
