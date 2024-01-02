const { body, validationResult } = require('express-validator');

var Comment = require('../models/comment');

// post a comment 
exports.comment_post = [
  body('text', 'Comment cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author cannot be empty').trim().isLength({ min: 1 }).escape(),
  
  (req, res) => {
    const errors = validationResult(req);
  
    const comment = new Comment({
      article: req.params.articleid,
      text: req.body.text,
      author: req.body.author
    });
  
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array().map(errorObj => errorObj.msg) });
    } else {
      comment.save(err => {
        if (err) res.status(400).json('Error: ' + err);
        res.send(comment);
      });
    }
  }
];

// get a list of comments by article id 
exports.comment_list_get = function(req, res) {
  Comment.find({ article: req.params.articleid })
    .exec((err, comments) => {
      if (err) res.status(400).json('Error: ' + err);
      res.send(comments);
    });
}

// delete a comment 
exports.comment_delete = function(req, res) {
  Comment.findByIdAndRemove(req.params.commentid, (err) => {
    if (err) res.status(400).json('Error: ' + err);
    res.send('COMMENT SUCCESSFULLY DELETED');
  });
}