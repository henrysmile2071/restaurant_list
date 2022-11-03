const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//Routes
//to add restaurant page('/new')
router.get('/new', (req, res) => {
  res.render('new')
})

//post new restaurant ('/')
router.post('/', (req, res) => {
  const restaurantData = req.body
  return Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show details('/:_id')
router.get('/:_id', (req, res) => {
  return Restaurant.findById(req.params._id)
    .lean()
    .then((restaurants) =>
      res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//to edit restaurant page('/:_id/edit')
router.get('/:_id/edit', (req, res) => {
  return Restaurant.findById(req.params._id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//post edited restaurant ('/:_id)
router.put('/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete restaurant
router.delete('/:_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//Export module
module.exports = router