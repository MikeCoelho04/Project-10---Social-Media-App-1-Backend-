const mongoose = require('mongoose')
const Post = require('./post.models')
const User = require('./user.models')

const likeSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    index: true,
  }
}, {
  timestamps: true,
})

likeSchema.index({ postId: 1, userId: 1 }, { unique: true })

const Like = mongoose.model('Like', likeSchema)

module.exports = Like