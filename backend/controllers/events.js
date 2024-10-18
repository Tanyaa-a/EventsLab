const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');

// Create a new event
const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(StatusCodes.CREATED).json({ event });
};

// Get all events
const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events, count: events.length });
};

// Get a single event by ID
const getEventById = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findById(eventId);
  
  if (!event) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: `No event with id: ${eventId}` });
  }
  res.status(StatusCodes.OK).json({ event });
};

const getUserEvents = async (req, res) => {
  const { userId } = req.params; 

  try {
    const events = await Event.find({ createdBy: userId });
    res.status(StatusCodes.OK).json({ events, count: events.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user events' });
  }
};

const updateEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findByIdAndUpdate(eventId, req.body, {
    new: true,
    runValidators: true
  });

  if (!event) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: `No event with id: ${eventId}` });
  }
  
  res.status(StatusCodes.OK).json({ event });
};


const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findByIdAndDelete(eventId);

  if (!event) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: `No event with id: ${eventId}` });
  }

  res.status(StatusCodes.OK).json({ message: 'Event deleted' });
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  getUserEvents,
  updateEvent,
  deleteEvent,
};
