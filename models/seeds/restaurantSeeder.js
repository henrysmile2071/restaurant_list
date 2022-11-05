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
  SEED_USERS.forEach(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        for (let i = 0; i < 3; i++) {
          restaurants[0].userId = userId
          Restaurant.create(restaurants[0])
            .then(restaurants.shift())
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  })
  console.log('done!')
})