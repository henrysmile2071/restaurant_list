const express = require('express')
const router = express.Router()
const User = require('../../models/user')

//routes
//Login Page
router.get('/login', (req, res) => {
  res.render('login')
})

//Post login info
router.post('login', (req, res) => {
  res.redirect('/')
})

//Register Page
router.get('/register', (req, res) => {
  res.render('register')
})

//Post Register
router.post('/register', (req, res) => {
  //Get form info
  const { name, email, password, confirmPassword } = req.body
  //Check if user is already registered
  User.findOne({ email }).then(user => {
    //if the same email is found, show message and stay at register page 
    if (user) {
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      console.log(req.body)
      return User.create({
        name,
        email,
        password,
      })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    }
  })
    .catch(err => console.log(err))
})

module.exports = router