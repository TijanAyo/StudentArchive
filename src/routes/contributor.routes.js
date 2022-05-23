const express = require('express')
const router = express.Router()
const { contribute, download, upload} = require('../controllers/contributor.controller')
const { Protect } = require('../middleware/auth.middleware')

//  @desc: Authorize user to access /contributor endpoint
router.get('/dashboard', Protect, async (_, res)=>{
    return res.render('../views/contributor/dashboard.ejs')
    /* return res.json('Student Archive:Contributor') */
})

//  Protected
//  @desc: Posting to the StudentArchive DB: Material
router.post('/contributor/upload', upload.single('file'), Protect, contribute)

// @desc: Download material
router.get('/download/:filename', download)

module.exports = router