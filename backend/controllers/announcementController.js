const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')

// get all announcements
const getAnnouncements = async (req, res) => {
  const user_id = req.user._id

  const announcements = await Announcement.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(announcements)
}

// get a single announcement
const getAnnouncement = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such announcement' })
  }

  const announcement = await Announcement.findById(id)

  if (!announcement) {
    return res.status(404).json({ error: 'No such announcement' })
  }

  res.status(200).json(announcement)
}


// create new announcement
const createAnnouncement = async (req, res) => {
  const { title, load, reps } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const announcement = await Announcement.create({ title, load, reps, user_id })
    res.status(200).json(announcement)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a announcement
const deleteAnnouncement = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such announcement' })
  }

  const announcement = await Announcement.findOneAndDelete({ _id: id })

  if (!announcement) {
    return res.status(400).json({ error: 'No such announcement' })
  }

  res.status(200).json(announcement)
}

// update a announcement
const updateAnnouncement = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such announcement' })
  }

  const announcement = await Announcement.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!announcement) {
    return res.status(400).json({ error: 'No such announcement' })
  }

  res.status(200).json(announcement)
}


module.exports = {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement
}