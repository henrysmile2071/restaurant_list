//app.js

//Require and Settings:
//packages and constants
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const port = 3000
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const hbsHelpers = exphbs.create({
  helpers: require('./utility/handlebarsHelper').helpers,
  defaultLayout: 'main',
})
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const sortMethods = require('./utility/sortMethod')
//template engine
app.engine('handlebars', hbsHelpers.engine)
app.set('view engine', 'handlebars')

//static files
app.use(express.static('public'))

//body parser
app.use(bodyParser.urlencoded({ extended: true }))
//method-override
app.use(methodOverride('_method'))
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
//to add restaurant page('/restaurants/new')
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//post new restaurant ('/restaurants')
app.post('/restaurants', (req, res) => {
  const restaurantData = req.body
  return Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show all restaurants index('/')
app.get('/', (req, res) => {
  Restaurant.find()
    .collation({ locale: "en" })
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => {
      res.render('index', { restaurants, sortMethods })
    })
    .catch(error => console.log(error))
})

//search('/search')
app.get('/search', (req, res) => {
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

//show details('/restaurants/:_id')
app.get('/restaurants/:_id', (req, res) => {
  return Restaurant.findById(req.params._id)
    .lean()
    .then((restaurants) =>
      res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//to edit restaurant page('/restaurants/:_id/edit')
app.get('/restaurants/:_id/edit', (req, res) => {
  return Restaurant.findById(req.params._id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//post edited restaurant ('/restaurants/:_id)
app.put('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete restaurant
app.delete('/restaurants/:_id/delete', (req, res) => {
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