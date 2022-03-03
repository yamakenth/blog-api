var express = require('express');
var router = express.Router();

/* ARTICLES */

// post an article 
// protected 
router.post('/articles', (req, res) => res.send('ARTICLES POST'));

// get list of all articles 
router.get('/articles', (req, res) => res.send('ARTICLES GET'));

// get an article 
router.get('/articles/:articleid', (req, res) => res.send('ARTICLE GET'));

// update an article 
// protected
router.put('/articles/:articleid', (req, res) => res.send('ARTICLE PUT'));

// delete an article 
// protected
router.delete('/articles/:articleid', (req, res) => res.send('ARTICLE DELETE'));

/* COMMENTS */

// post a comment by article id 
router.post('/articles/:articleid/comments', (req, res) => res.send('COMMENT POST'));

// get a list of comments by article id 
router.get('/articles/:articleid/comments', (req, res) => res.send('COMMENTS GET'));

// delete a comment 
// protected
router.delete('/articles/:articleid/comments/:commentid', (req, res) => res.send('COMMENT DELETE'));

/* USERS */

// post signup
router.post('/users/signup', (req, res) => res.send('USER SIGNUP POST'));

// post login
router.post('/users/login', (req, res) => res.send('USER LOGIN POST'));

// get a list of users 
// protected 
router.get('/users', (req, res) => res.send('USERS GET'));

module.exports = router;