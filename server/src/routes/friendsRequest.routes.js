const express = require('express')
const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  followBackFriendRequest,
  getReceivedFriendRequests,
  getSentFriendRequests,
} = require('../controllers/friendsRequest.controllers.js')
const {
  isUserLoggedIn,
} = require('../middlewares/auth.middlewares')

const router = express.Router()

router.post('/friend-request/send', isUserLoggedIn, sendFriendRequest)
router.patch('/friend-request/accept/:requestId', isUserLoggedIn, acceptFriendRequest)
router.patch('/friend-request/reject/:requestId', isUserLoggedIn, rejectFriendRequest)
router.patch('/friend-request/follow-back/:requestId', isUserLoggedIn, followBackFriendRequest)
router.get('/friend-request/received', isUserLoggedIn, getReceivedFriendRequests)
router.get('/friend-request/sent', isUserLoggedIn, getSentFriendRequests)

module.exports = router
