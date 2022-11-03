const express = require('express')
const router = express.Router()

//require modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

//apply routes
router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/', home)

//export module
module.exports = router