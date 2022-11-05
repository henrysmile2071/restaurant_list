//app.js
//Require and Settings:
//packages and constants
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const hbsHelpers = exphbs.create({
  helpers: require('./utility/handlebarsHelper').helpers,
  defaultLayout: 'main',
})
const bodyParser = require('body-parser')
const routes = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

//Use middleware
app.engine('handlebars', hbsHelpers.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) =>{
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.sucess_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

//Start server
app.listen(process.env.PORT, () => {
  console.log(`Express is listening on localhost:${process.env.PORT}`)
})