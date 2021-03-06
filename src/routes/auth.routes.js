const express = require('express')
const router = express.Router()

const {register, login} = require('../controllers/auth.controller')

// @desc: Login Route
router.get('/auth/contributor/login', (_, res) => {
    return res.render('../views/auth/login.ejs', {message: 'Wrong info passed... confirm credentials'})
})
router.post('/auth/contributor/login', login)

// @desc: Register Route
router.get('/auth/contributor/register', (_, res)=>{
    return res.render('../views/auth/register.ejs')
})
router.post('/auth/contributor/register', register)


module.exports = router