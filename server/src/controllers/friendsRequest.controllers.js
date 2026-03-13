const FriendRequest = require('../models/friendsRequest.models')
const Follow = require('../models/follow.models')
const User = require('../models/user.models')

const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req._id
    const { receiverId } = req.body

    if (!receiverId) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'receiverId is required',
      })
    }

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'You cannot send a friend request to yourself',
      })
    }

    const alreadyFollowing = await Follow.findOne({
      followerId: senderId,
      followingId: receiverId,
    })

    if (alreadyFollowing) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'You already follow this user',
      })
    }

    const existingRequest = await FriendRequest.findOne({
      senderId,
      receiverId,
    })

    if (existingRequest) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'Friend request already sent',
      })
    }

    const reverseRequest = await FriendRequest.findOne({
      senderId: receiverId,
      receiverId: senderId,
      status: 'pending',
    })

    if (reverseRequest) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'This user has already sent you a friend request',
      })
    }

    const request = await FriendRequest.create({
      senderId,
      receiverId,
      status: 'pending',
    })

    return res.status(201).json({
      status: 'OK',
      message: 'Friend request sent',
      data: request,
    })
  } catch (error) {
    return res.status(500).json({
      status: 'FAILED',
      message: 'Failed to send friend request',
    })
  }
}

const acceptFriendRequest = async (req, res) => {
  try {
    const currentUserId = req._id
    const { requestId } = req.params

    const request = await FriendRequest.findById(requestId)

    if (!request) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Friend request not found',
      })
    }

    if (request.receiverId.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Not authorized to accept this request',
      })
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        status: 'FAILED',
        message: 'This request is no longer pending',
      })
    }

    request.status = 'accepted'
    await request.save()

    await Follow.create({
      followerId: request.senderId,
      followingId: request.receiverId,
    })

    await User.findByIdAndUpdate(request.senderId, {
      $inc: {
        numberOfFollowing: 1,
      },
    })

    await User.findByIdAndUpdate(request.receiverId, {
      $inc: {
        numberOfFollowers: 1,
      },
    })

    return res.json({
      status: 'OK',
      message: 'Friend request accepted',
    })
  } catch (error) {
    return res.status(500).json({
      status: 'FAILED',
      message: 'Failed to accept friend request',
    })
  }
}

const rejectFriendRequest = async (req, res) => {
  try {
    const currentUserId = req._id
    const { requestId } = req.params

    const request = await FriendRequest.findById(requestId)

    if (!request) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Friend request not found',
      })
    }

    if (request.receiverId.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Not authorized to reject this request',
      })
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        status: 'FAILED',
        message: 'This request is no longer pending',
      })
    }

    request.status = 'rejected'
    await request.save()

    return res.json({
      status: 'OK',
      message: 'Friend request rejected',
    })
  } catch (error) {
    return res.status(500).json({
      status: 'FAILED',
      message: 'Failed to reject friend request',
    })
  }
}

const followBackFriendRequest = async (req, res) => {
  try {
    const currentUserId = req._id
    const { requestId } = req.params

    const request = await FriendRequest.findById(requestId)

    if (!request) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Friend request not found',
      })
    }

    if (request.receiverId.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Not authorized to follow back this request',
      })
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        status: 'FAILED',
        message: 'This request is no longer pending',
      })
    }

    const senderId = request.senderId.toString()

    const alreadyFollowing = await Follow.findOne({
      followerId: currentUserId,
      followingId: senderId,
    })

    if (alreadyFollowing) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'You already follow this user',
      })
    }

    const existingOutgoingRequest = await FriendRequest.findOne({
      senderId: currentUserId,
      receiverId: senderId,
      status: 'pending',
    })

    if (existingOutgoingRequest) {
      return res.json({
        status: 'OK',
        message: 'Friend request already sent back',
        data: existingOutgoingRequest,
      })
    }

    const newRequest = await FriendRequest.create({
      senderId: currentUserId,
      receiverId: senderId,
      status: 'pending',
    })

    return res.json({
      status: 'OK',
      message: 'Friend request sent back',
      data: newRequest,
    })
  } catch (error) {
    return res.status(500).json({
      status: 'FAILED',
      message: 'Failed to follow back this request',
    })
  }
}

const getReceivedFriendRequests = async (req, res) => {
  try {
    const currentUserId = req._id

    const requests = await FriendRequest.find({
      receiverId: currentUserId,
      status: 'pending',
    }).populate('senderId', 'fullName avatarUrl username')

    return res.json({
      status: 'OK',
      data: requests,
    })
  } catch (error) {
    return res.status(500).json({
      status: 'FAILED',
      message: 'Failed to fetch friend requests',
    })
  }
}

const getSentFriendRequests = async (req, res) => {
  try {
    const currentUserId = req._id

    const requests = await FriendRequest.find({
      senderId: currentUserId,
      status: 'pending',
    }).select('receiverId')

    return res.json({
      status: 'OK',
      data: requests,
    })
  } catch (error) {
    return res.status(500).json({
      status: 'FAILED',
      message: 'Failed to fetch sent friend requests',
    })
  }
}

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  followBackFriendRequest,
  getReceivedFriendRequests,
  getSentFriendRequests,
}
