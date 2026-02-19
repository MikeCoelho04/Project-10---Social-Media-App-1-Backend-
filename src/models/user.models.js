const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
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
    minLength: 20,
  },
  profilePic: {
    type: String,
  },  
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User