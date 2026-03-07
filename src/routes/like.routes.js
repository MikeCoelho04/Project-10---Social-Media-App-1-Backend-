const express = require('express')
const router = express.Router()

const {
  isUserLoggedIn,
} = require('../middlewares/auth.middlewares')

const togglePostlike = require('../controllers/like.controllers')

router.post('/posts/:postId/like', isUserLoggedIn, togglePostlike)

module.exports = router