const express = require('express')
const router = express.Router()
const { contribute } = require('../controllers/contributor.controller')
const { Protect } = require('../middleware/auth.middleware')


//  @desc: Authorize user to access /contributor endpoint
router.get('/contributor', Protect, (req, res)=>{
    return res.json('Student Archive:Contributor')
})

//  Protected
//  @desc: Posting to the StudentArchive DB: Material
router.post('/contributor/upload', Protect, contribute)

module.exports = router