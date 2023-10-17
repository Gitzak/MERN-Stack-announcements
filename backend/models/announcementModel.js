const mongoose = require('mongoose')

const Schema = mongoose.Schema

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: Number,
    required: true
  },
  typeOfJob: {
    type: String,
    enum: ['Remote', 'Hybrid', 'Office'],
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announcementSchema)