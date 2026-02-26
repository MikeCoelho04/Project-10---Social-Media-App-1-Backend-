const mongoose = require('mongoose')
const User = require('./user.models')

const postSchema = mongoose.Schema({

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 1,
  },
  mediaUrls: {
    type: String,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  }

}, {
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post