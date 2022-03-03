var express = require('express');
var router = express.Router();

// post a comment 
exports.comment_post = function(req, res) {
  res.send('COMMENT POST');
}

// get a list of comments by article id 
exports.comment_list_get = function(req, res) {
  res.send('COMMENTS GET');
}

// delete a comment 
exports.comment_delete = function(req, res) {
  res.send('COMMENT DELETE');
}