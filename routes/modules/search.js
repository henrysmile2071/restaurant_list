const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortMethods = require('../../utility/sortMethod')

//Routes
//search('/search')
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const selected = req.query.sortMethod
  const sortBy = sortMethods.find(x => x.text === selected).method
  const searchQuery = { $text: { $search: keyword } } //https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose
  return Restaurant.find(searchQuery)
    .collation({ locale: "en" })//fix for MongoDB case-insensitive sorting
    .lean()
    .sort(sortBy)
    .then(restaurants => {
      const resultsCount = Object.keys(restaurants).length
      res.render('index', { restaurants, keyword, resultsCount, sortMethods, selected })
    })
    .catch(error => console.log(error))
})
//Export module
module.exports = router