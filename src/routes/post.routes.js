const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploadMediaForPost')

const {
  fetchPosts,
  fetchSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/post.controllers')

router.get('/posts', fetchPosts)

router.get('/posts/:postId', fetchSinglePost)

router.post('/posts', upload.single('mediaUrls'), createPost)

router.patch('/posts/:id', upload.single('mediaUrls'), updatePost)

router.delete('/posts/:id', deletePost)

module.exports = router