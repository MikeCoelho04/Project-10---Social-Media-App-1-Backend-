const express = require('express')
const router = express.Router()

const togglePostlike = require('../controllers/like.controllers')

router.post('/posts/:postId/like', togglePostlike)

module.exports = router