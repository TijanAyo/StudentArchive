const express = require('express')
const router = express.Router()
const { contribute, download, dashboard} = require('../controllers/contributor.controller')
const { Protect } = require('../middleware/auth.middleware')
const upload = require('../utils/multer/upload')

//  @desc: Authorize user to access /contributor endpoint
router.get('/dashboard', dashboard)

//  Protected
//  @desc: Posting to the StudentArchive DB: Material
router.post('/contributor/upload', upload.single('file'), Protect, contribute)

// @desc: Download material
router.get('/download/:filename', download)

module.exports = router