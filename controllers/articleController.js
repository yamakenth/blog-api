var express = require('express');
var router = express.Router();

// create an article 
exports.article_post = function(req, res) {
  res.send('ARTICLE POST');
}

// get list of articles 
exports.article_list_get = function(req, res) {
  res.send('ARTICLES GET');
}

// get an article 
exports.article_get = function(req, res) {
  res.send('ARTICLE GET');
}

// update an article 
exports.article_put = function(req, res) {
  res.send('ARTICLE PUT');
}

// delete an article 
exports.article_delete = function(req, res) {
  res.send('ARTICLE DELETE');
}