const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  name: { type: String, },
  date: { type: Date, },
  text: { type: String, }
});

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment

