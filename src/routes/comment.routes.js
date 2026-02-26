const express = require('express')
const router = express.Router()

const {
  createComment,
  fetchPostComments,
  fetchComment,
  updateComment,
  deleteComment
} = require('../controllers/comment.controllers')

router.post('/posts/:postId/comments', createComment)

router.get('/posts/:postId/comments', fetchPostComments)

router.get('/comments/:commentId', fetchComment)

router.patch('/comments/:commentId', updateComment)

router.delete('/comments/:commentId', deleteComment)

module.exports = router