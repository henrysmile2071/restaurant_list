const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//routes
//Login Page
router.get('/login', (req, res) => {
  res.render('login')
})

//Post Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//Register Page
router.get('/register', (req, res) => {
  res.render('register')
})

//Post Register
router.post('/register', (req, res) => {
  //Get form info
  const { name, email, password, confirmPassword } = req.body
  //Check if user is already registered
  User.findOne({ email })
    .then(user => {
      //if the same email is found, show message and stay at register page 
      if (user) {
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
        })
      }
      //if new user, create hashed password to add to db
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash,
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

//Logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router