const express = require('express')
const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncement,
  deleteAnnouncement,
  updateAnnouncement
} = require('../controllers/announcementController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all announcement routes
router.use(requireAuth)

// GET all announcements
router.get('/', getAnnouncements)

//GET a single announcement
router.get('/:id', getAnnouncement)

// POST a new announcement
router.post('/', createAnnouncement)

// DELETE a announcement
router.delete('/:id', deleteAnnouncement)

// UPDATE a announcement
router.patch('/:id', updateAnnouncement)


module.exports = router