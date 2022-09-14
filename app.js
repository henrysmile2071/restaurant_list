//app.js
//Require and Settings:
//packages and constants
require('./config/mongoose')
const express = require('express')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const hbsHelpers = exphbs.create({
  helpers: require('./utility/handlebarsHelper').helpers,
  defaultLayout: 'main',
})
const bodyParser = require('body-parser')
const routes = require('./routes')

//Use middleware
app.use(routes)
app.engine('handlebars', hbsHelpers.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//Start server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})