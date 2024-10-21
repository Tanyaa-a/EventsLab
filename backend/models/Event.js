const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide the event title'],
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 1000
  },
  date: {
    type: Date,
    required: [true, 'Please provide the event date']
  },
  location: {
    type: String,
    required: [true, 'Please provide the event location']
  },
  organizer: {
    type: String,
    required: [true, 'Please provide the event organizer']
  },
  price: {
    type: Number,
    required: [true, 'Please provide the event price']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;


