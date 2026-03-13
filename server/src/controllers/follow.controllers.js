const Follow = require('../models/follow.models')
const User = require('../models/user.models')
const FriendRequest = require('../models/friendsRequest.models')

const createFollow = async (req, res) => {

  try {

    const { followingId } = req.params

    const followerId = req._id
    

    if(!followerId) {
      return res.status(400).json ({
        status: 'FAILED',
        message: 'followingId is required'
      })
    }

    if(followingId == followerId) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'You can not follow yourself'
      })
    }

    const deleted = await Follow.findOneAndDelete({ followerId, followingId })

    if (deleted) {

      await User.findByIdAndUpdate(followerId, { $inc: { numberOfFollowing: -1 } })
      await User.findByIdAndUpdate(followingId, { $inc: { numberOfFollowers: -1 } })

      return res.json({
        status: 'OK',
        following: false,
        message: 'Unfollowed successfully'
      })

    }

    await Follow.create({ followerId, followingId })

    await User.findByIdAndUpdate(followerId, { $inc: { numberOfFollowing: 1 } })
    await User.findByIdAndUpdate(followingId, { $inc: { numberOfFollowers: 1 } })

    res.json({
      status: 'OK',
      following: true,
      message: 'You are now following this user'
    })

  } catch(error) {

    console.log(error)

    res.json({
      status: 'FAILED',
      message: 'Failed to follow this user'
    })

  }

}

const fetchFollowers = async (req, res) => {

  try {

    const { userId } = req.params

    const data = await Follow.find({ followingId: userId }).select('followerId -_id').populate({
      path: 'followerId',
      select: 'username, fullName'
    }).lean()

    res.json({
      status: 'OK',
      data: data
    })

  } catch(error) {

    console.log(error)

    res.json({
      status: 'FAILED',
      message: 'Failed to show followers'
    })

  }

}

const fetchFollowings = async (req, res) => {

  try {

    const { userId } = req.params
    
    const data = await Follow.find({ followerId: userId })
      .select('followingId')
      .populate({
        path: 'followingId',
        select: 'username fullName avatarUrl',
      })
      .lean()

    res.json({
      status: 'OK',
      data,
    })

  } catch(error) {

    console.log(error)
    res.json({
      status: 'FAILED',
      message: 'Failed to show followings'
    })

  }

}

const getSuggestedFriends = async (req, res) => {

  try {

    const currentUserId = req._id
    const excludedIdsFromQuery = req.query.excludedIds
      ? req.query.excludedIds.split(',')
      : []

    const followingRelations = await Follow.find({ followerId: currentUserId}).select('followingId')

    const followingIds = followingRelations.map((relation) => relation.followingId.toString())

    const sentPendingRequests = await FriendRequest.find({
      senderId: currentUserId,
      status: 'pending',
    }).select('receiverId')

    const pendingReceiverIds = sentPendingRequests.map((r) => r.receiverId.toString())

    const excludedIds = [currentUserId.toString(), ...followingIds, ...pendingReceiverIds, ...excludedIdsFromQuery]

    const limit = Number(req.query.limit) || 3

    const suggestedUsers = await User.find({_id: { $nin: excludedIds }}).select('-password -email').limit(limit)

    return res.json({
      status: 'OK',
      data: suggestedUsers,
    })

  } catch (error) {

    return res.status(500).json({
      status: 'FAILED',
      message: 'Failed to fetch suggested friends'
    })

  }

}

module.exports = {
  createFollow,
  fetchFollowers,
  fetchFollowings,
  getSuggestedFriends,
}
