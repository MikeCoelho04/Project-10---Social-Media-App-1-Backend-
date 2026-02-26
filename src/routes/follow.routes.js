const express = require('express')
const router = express.Router()

const {
  createFollow,
  fetchFollowers,
  fetchFollowings,
} = require('../controllers/follow.controllers')

router.post('/users/:followingId/follow-toggle', createFollow)

router.get('/users/:userId/followers', fetchFollowers)

router.get('/users/:userId/following', fetchFollowings)

module.exports = router