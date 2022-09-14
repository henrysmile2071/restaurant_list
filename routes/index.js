const express = require('express')
const router = express.Router()

//require modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')

//apply routes
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)

//export module
module.exports = router