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
    type: String,
    default: '0',
  },
  following: {
    type: String,
    default: '0',
  },
  numberOfPosts: {
    type: String,
    default: '0',
  },
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User