const express = require('express');
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  getUserEvents,
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

  router.route('/user/:userId')
  .get(getUserEvents); 

module.exports = router;
