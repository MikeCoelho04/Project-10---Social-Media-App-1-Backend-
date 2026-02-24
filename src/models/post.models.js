const mongoose = require('mongoose')
const User = require('./user.models')

const postSchema = mongoose.Schema({

  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 50,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  }

}, {
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post