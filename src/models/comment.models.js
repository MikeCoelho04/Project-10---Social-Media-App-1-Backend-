const mongoose = require('mongoose')
const User = require('./user.models')
const Post = require('./post.models')

const commentSchema = mongoose.Schema({

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }

}, {
  timestamps: true
})

const Comment = mongoose.model('Commnet', commentSchema)

module.exports = Comment