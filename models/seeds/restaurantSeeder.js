const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // load model
const restaurantList = require('../restaurant.json')
const restaurants = restaurantList.results

//connect to database
db.once('open', () => {
  console.log('mongodb connected!')
  restaurants.forEach(entry => {
    Restaurant.create(entry)
  })
  console.log('done!')
})