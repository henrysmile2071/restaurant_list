const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortMethods = require('../../utility/sortMethod')

//Routes
//search('/search')
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const selected = req.query.sortMethod
  const userId = req.user._id
  const sortBy = sortMethods.find(x => x.text === selected).method
  const searchQuery = { $text: { $search: keyword }, userId } //https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose //add userId filter
  return Restaurant.find(searchQuery)
    .collation({ locale: "en" })//fix for MongoDB case-insensitive sorting
    .lean()
    .sort(sortBy)
    .then(restaurants => {
      const resultsCount = restaurants.length //refactor: Object.keys(restaurants).length can be simplified
      res.render('index', { restaurants, keyword, resultsCount, sortMethods, selected })
    })
    .catch(error => console.log(error))
})
//Export module
module.exports = router