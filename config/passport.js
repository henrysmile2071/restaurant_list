const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

module.exports = app => {
  //initialize module
  app.use(passport.initialize())
  app.use(passport.session())
  //setup local login strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, {
            message: 'This email is not registered!'
          })
        }
        return bcrypt
          .compare(password, user.password)
          .then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
            return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  //setup Facebook login strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (acessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))
  //password serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser
    ((id, done) => {
      User.findById(id)
        .lean()
        .then(user => done(null, user))
        .catch(err => done(err, null))
    })
}