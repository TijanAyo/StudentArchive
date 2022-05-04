const express = require('express')
const router = express.Router()
const {index, statusCheck, about} = require('../controllers/index.controller')

//  @desc: APi check
router.get('/api/status', statusCheck)

//  @desc: Index page
router.get('/', index)

//  @desc: About page
router.get('/about', about)


module.exports = router