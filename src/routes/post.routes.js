const express = require('express')
const router = express.Router()

const {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  togglePostlike,
} = require('../controllers/post.controllers')

router.get('/posts', fetchPosts)

router.post('/posts', createPost)

router.patch('/posts/:id', updatePost)

router.delete('/posts/:id', deletePost)

router.post('/posts/:id/like-toggle', togglePostlike)

module.exports = router