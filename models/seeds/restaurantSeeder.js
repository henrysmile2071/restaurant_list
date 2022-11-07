const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // load model
const restaurants = require('../restaurant.json').results
const User = require('../user')
const SEED_USERS = [
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: 'User2',
    email: 'user2@example.com',
    password: '12345678',
  },
]

//connect to database
db.once('open', () => {
  Promise.all(
    SEED_USERS.map((user) =>
      User.create({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10)//refactor hash generation using hashSync
      })
        .then(user => {
          const userRestaurants = []
          for (let i = 0; i < 3; i++) {
            restaurants[0].userId = user._id
            userRestaurants.push(restaurants[0])
            restaurants.shift()
          }
          return Restaurant.create(userRestaurants)
        })
    ))
    .then(() => {
      console.log('done!')
      process.exit()
    })
})