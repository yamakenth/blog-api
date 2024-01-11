require("dotenv").config();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var passport = require("passport");

var User = require("../models/user");
var { JWT_SECRET } = require("../environment");

// post signup
exports.user_signup_post = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username cannot be empty")
    .custom((value) => {
      return User.find({ username: value }).then((user) => {
        if (user.length > 0) {
          return Promise.reject(`Username ${value} is already taken`);
        }
      });
    }),
  body("password", "Password cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password-confirm")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password confirmation cannot be empty")
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send({ errors: errors.array().map((errorObj) => errorObj.msg) });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) res.status(400).json("Error: " + err);

        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });

        user.save((err) => {
          if (err) res.status(400).json("Error: " + err);
          res.send(user);
        });
      });
    }
  },
];

// post login
exports.user_login_post = function (req, res) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) return res.send(info);

    req.login(user, { session: false }, (err) => {
      if (err) return res.send(err);

      var token = jwt.sign({ data: user }, JWT_SECRET);
      res.send({ user, token });
    });
  })(req, res);
};

// get a list of users
exports.user_list_get = function (req, res) {
  User.find().exec((err, users) => {
    if (err) res.status(400).json("Error: " + err);
    res.send(users);
  });
};
