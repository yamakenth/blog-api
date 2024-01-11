require("dotenv").config();
var bcrypt = require("bcryptjs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportJWT = require("passport-jwt");
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

var User = require("./models/user");
var { JWT_SECRET } = require("./environment");

// local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: "Username not found" });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        if (res) {
          return done(null, user, { message: "Logged in successfully" });
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

// jwt startegy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, done) => {
      User.findOne({ _id: jwtPayload.data._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
