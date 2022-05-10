const express = require('express')
const router = express.Router()

const {register, login} = require('../controllers/auth.controller')

// @desc: Login Route
router.get('/auth/contributor/login', (req, res) => {
    return res.send('Student Archive:Login')
})
router.post('/auth/contributor/login', login)

// @desc: Register Route
router.get('/auth/contributor/register', (req, res)=>{
    return res.send('Student Archive: Register')
})
router.post('/auth/contributor/register', register)


module.exports = router