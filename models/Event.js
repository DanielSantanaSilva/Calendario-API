const mongoose = require('mongoose')

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    description: {
      type: String
    },
    user: Object
  },
  {
    timestamps: true
  }
)

const Event = mongoose.model('Event', EventSchema)
module.exports = Event
