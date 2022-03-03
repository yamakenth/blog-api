var express = require('express');
var router = express.Router();

var User = require('../models/user');

// post signup
exports.user_signup_post = function(req, res) {
  res.send('USER SIGNUP POST');
}

// post login
exports.user_login_post = function(req, res) {
  res.send('USER LOGIN POST');
}

// get a list of users  
exports.user_list_get = function(req, res) {
  res.send('USERS GET');
}