const { body, validationResult } = require('express-validator');

var Article = require('../models/article');

// create an article 
exports.article_post = [
  body('title', 'Title cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('text', 'Text cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('published', 'Published must be a boolean').isBoolean(),

  (req, res) => {
    const errors = validationResult(req);

    const article = new Article({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      published: req.body.published
    });

    if (!errors.isEmpty()) {
        res.send({ errors: errors.array().map(errorObj => errorObj.msg) });
    } else {
      article.save(err => {
        if (err) res.status(400).json('Error: ' + err);
        res.send(article);
      });
    }
  } 
];

// get list of articles 
exports.article_list_get = function(req, res) {
  Article.find()
    .populate('author')
    .exec((err, articles) => {
      if (err) res.status(400).json('Error: ' + err);
      res.send(articles);
    });
}

// get an article 
exports.article_get = function(req, res) {
  Article.findOne({ _id: req.params.articleid })
    .populate('author')
    .exec((err, article) => {
      if (err) res.status(400).json('Error: ' + err);
      res.send(article);
    });
}

// update an article 
exports.article_put = [
  body('title', 'Title cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('text', 'Text cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('published', 'Published must be a boolean').isBoolean(),

  (req, res) => {
    const errors = validationResult(req);
  
    const article = new Article({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      published: req.body.published,
      _id: req.params.articleid
    });
  
    if (!errors.isEmpty()) {
        res.send({ errors: errors.array().map(errorObj => errorObj.msg) });
    } else {
      Article.findByIdAndUpdate(req.params.articleid, article, {}, (err) => {
        if (err) res.status(400).json('Error: ' + err);
        res.send(article);
      });
    }    
  } 
];

// delete an article 
exports.article_delete = function(req, res) {
  Article.findByIdAndRemove(req.params.articleid, (err) => {
    if (err) res.status(400).json('Error: ' + err);
    res.send('ARTICLE SUCCESSFULLY DELETED');
  });
}