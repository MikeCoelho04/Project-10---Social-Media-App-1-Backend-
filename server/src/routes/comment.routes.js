const express = require('express')
const router = express.Router()

const {
  isUserLoggedIn,
  isCommentOwner,
} = require('../middlewares/auth.middlewares')

const {
  createComment,
  fetchPostComments,
  fetchComment,
  updateComment,
  deleteComment
} = require('../controllers/comment.controllers')

router.post('/posts/:postId/comments', isUserLoggedIn, createComment)

router.get('/posts/:postId/comments', isUserLoggedIn, fetchPostComments)

router.get('/comments/:commentId', isUserLoggedIn, fetchComment)

router.patch('/comments/:commentId', isUserLoggedIn, isCommentOwner, updateComment)

router.delete('/comments/:commentId', isUserLoggedIn, isCommentOwner, deleteComment)

module.exports = router