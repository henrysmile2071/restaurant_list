const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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