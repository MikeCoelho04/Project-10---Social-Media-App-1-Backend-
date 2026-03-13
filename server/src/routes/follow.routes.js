const express = require('express')
const router = express.Router()

const {
  isUserLoggedIn
} = require('../middlewares/auth.middlewares')

const {
  createFollow,
  fetchFollowers,
  fetchFollowings,
  getSuggestedFriends,
} = require('../controllers/follow.controllers')

router.get('/follow/suggested-friends', isUserLoggedIn, getSuggestedFriends)

router.post('/users/:followingId/follow-toggle', isUserLoggedIn, createFollow)

router.get('/users/:userId/followers', isUserLoggedIn, fetchFollowers)

router.get('/users/:userId/following', isUserLoggedIn, fetchFollowings)


module.exports = router