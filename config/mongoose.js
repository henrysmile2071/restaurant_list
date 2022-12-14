const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.
  MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.set('useFindAndModify', false)
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
module.exports = db