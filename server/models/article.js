var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    published: { type: Boolean }    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', ArticleSchema);