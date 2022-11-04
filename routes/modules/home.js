const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortMethods = require('../../utility/sortMethod')

//homepage route
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId})
    .collation({ locale: "en" })
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => {
      res.render('index', { restaurants, sortMethods })
    })
    .catch(error => console.log(error))
})
//Export module
module.exports = router