//app.js

//Require and Settings:
//packages and constants
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true })
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//static files
app.use(express.static('public'))

// connect to database
const db = mongoose.connection
// Error
db.on('error', () => {
  console.log('mongodb error!')
})
// Connection success
db.once('open', () => {
  console.log('mongodb connected!')
})

//Routes

//index('/')
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
//search('/search')
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants, keyword })
})
//show('/restaurants/:restaurant_id')
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant })
})

//Start server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})