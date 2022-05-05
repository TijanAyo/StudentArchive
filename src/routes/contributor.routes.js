const express = require('express')
const router = express.Router()
const { contribute } = require('../controllers/contributor.controller')


//  @desc: Authorize user to access /contributor endpoint
router.get('/contributor', (req, res)=>{
    return res.send('Student Archive:Contributor')
})

//  @desc: Posting to the StudentArchive DB
router.post('/contributor', contribute)

module.exports = router