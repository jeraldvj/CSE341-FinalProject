const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');
const User = db.user;

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.find({username: username});
    console.log(user.length)
    if(user.length === 0) {
      return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    //const comparePassword = bcrypt.compareSync(password, user[0]['password'])
    if(!bcrypt.compareSync(password, user[0]['password'])) {
      return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user[0]['id']);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
