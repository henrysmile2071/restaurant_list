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
  const userId = req.user._id
  restaurantData.push(userId)
  return Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show details('/:_id')
router.get('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurants) =>
      res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//to edit restaurant page('/:_id/edit')
router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//post edited restaurant ('/:_id)
router.put('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  req.body.push(userId)
  return Restaurant.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete restaurant
router.delete('/:_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//Export module
module.exports = router