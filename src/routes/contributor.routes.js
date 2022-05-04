const express = require('express')
const router = express.Router()


//  @desc: Contributor Route
//  @desc: Authorize user to access /contributor endpoint
router.get('/contributor', (req, res)=>{
    return res.send('Student Archive:Contributor')
})

module.exports = router