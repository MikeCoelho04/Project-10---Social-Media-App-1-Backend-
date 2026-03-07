const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploadMediaForPost')

const {
  isUserLoggedIn,
  isPostOwner,
} = require('../middlewares/auth.middlewares')

const {
  fetchPosts,
  fetchSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/post.controllers')

router.get('/posts', isUserLoggedIn, fetchPosts)

router.get('/posts/:postId', isUserLoggedIn, fetchSinglePost)

router.post('/posts', isUserLoggedIn, upload.single('mediaUrls'), createPost)

router.patch('/posts/:postId', isUserLoggedIn, isPostOwner, upload.single('mediaUrls'), updatePost)

router.delete('/posts/:postId', isUserLoggedIn, isPostOwner, deletePost)

module.exports = router