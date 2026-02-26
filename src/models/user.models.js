const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  numberOfPosts: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User