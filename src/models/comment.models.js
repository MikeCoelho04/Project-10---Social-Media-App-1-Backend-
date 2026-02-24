const mongoose = require('mongoose')
const User = require('./user.models')
const Post = require('./post.models')

const commentSchema = mongoose.Schema({

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    minLength: 1,
  }

}, {
  timestamps: true
})

const Comment = mongoose.model('Commnet', commentSchema)

module.exports = Comment