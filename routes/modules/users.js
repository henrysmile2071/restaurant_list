const express = require('express')
const router = express.Router()

//routes
//Login Page
router.get('/login', (req, res) => {
  res.render('login')
})

//Post login info
router.post('login', (req, res) => {
  res.redirect('/')
})
module.exports = router