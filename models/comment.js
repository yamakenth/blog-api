var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    text: { type: String, required: true },
    author: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);