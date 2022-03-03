require('dotenv').config();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// import { Strategy as LocalStrategy} from 'passport-local';
// import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

var User = require('./models/user');

// local strategy 
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      return done(null, false, { message: 'Username not found' });
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return done(err);
      if (res) {
        return done(null, user, { message: 'Logged in successfully'});
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    });
  });
}));

