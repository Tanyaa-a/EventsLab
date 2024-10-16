const express = require('express');
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/events');

// Define routes
router.route('/')
  .post(createEvent) 
  .get(getAllEvents); 

router.route('/:id')
  .get(getEventById)
  .patch(updateEvent) 
  .delete(deleteEvent);

module.exports = router;
