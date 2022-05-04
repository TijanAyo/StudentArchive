const express = require('express')
const router = express.Router()

const {register, login} = require('../controllers/auth.controller')

// @desc: Login Route
router.get('/auth/login/contributor', (req, res) => {
    return res.send('Student Archive:Login')
})
router.post('/auth/login/contributor', login)

// @desc: Register Route
router.get('/auth/register/contributor', (req, res)=>{
    return res.send('Student Archive: Register')
})
router.post('/auth/register/contributor', register)


module.exports = router