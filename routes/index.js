var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('hello world');
});

router.get('/again', function(req, res, next) {
  res.send('hello world again');
});

module.exports = router;