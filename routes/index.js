const express = require('express')
const router = express.Router()

//require modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const auth = require('./modules/auth')
const {authenticator} = require('../middleware/auth')
//apply routes
router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/search', search)
router.use('/', authenticator, home)

//export module
module.exports = router