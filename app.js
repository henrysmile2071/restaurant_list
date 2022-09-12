//app.js

//Require and Settings:
//packages and constants
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true })
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//static files
app.use(express.static('public'))

//body parser
app.use(bodyParser.urlencoded({ extended: true }))

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
//to add restaurant page('/restaurant/new')
app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

//post new restaurant ('/restaurants')
app.post('/restaurants', (req, res) => {
  const restaurantData = req.body
  return Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show all resatuarants index('/')
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//search('/search')
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(restaurants => {
      return restaurants.name.toLowerCase().includes(keyword) || restaurants.category.includes(keyword)
    })
    res.render('index', { restaurants: filterRestaurants, keyword })})
    .catch(error => console.log(error))
})

//show details('/restaurants/:restaurant_id')
app.get('/restaurants/:restaurant_id', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then((restaurants) =>
      res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//to edit restaurant page('/restaurants/:restaurant_id/edit')
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//post edited restaurant ('/restaurants/:restaurant_id)
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete restaurant
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Start server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})