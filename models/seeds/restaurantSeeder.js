const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // load model
const restaurantList = require('../restaurant.json')
const restaurants = restaurantList.results

//connection settings
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true })

//connect to database
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurants.forEach(entry => {
    Restaurant.create(entry)
  })
  console.log('done!')
})