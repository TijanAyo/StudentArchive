const express = require('express')
const router = express.Router()
const { contribute, download, dashboard, Archive} = require('../controllers/contributor.controller')
const { Protect } = require('../middleware/auth.middleware')
const upload = require('../utils/multer/upload')

// Protected
// ONLY ALLOWED USER CAN ACCESS THIS ENDPOINT
router.get('/dashboard', Protect, dashboard)

//  Protected
//  CONTRIBUTOR ALLOWED TO ADD NEW COURSE TO ARCHIVE
router.post('/contributor/upload', upload.single('file'), Protect, contribute)

// ALL AVAILABLE COURSES
router.get('/courses', Archive)

// DOWNLOAD COURSES
router.get('/download/:filename', download)

module.exports = router