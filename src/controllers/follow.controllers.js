const Follow = require('../models/follow.models')
const User = require('../models/user.models')

const createFollow = async (req, res) => {

  try {

    const { followerId } = req.body
    
    const { followingId } = req.params

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

    const deleted = await Follow.findOneAndDelete( {followerId, followingId} )

    if(deleted) {

      await User.findByIdAndUpdate(followerId, { $inc: { following: -1 } })
      await User.findByIdAndUpdate(followingId, { $inc: { followers: -1 } })

      return res.json({
        status: 'OK',
        message: 'Unfollowed successfully'
      })

    }

    await Follow.create({ followerId, followingId })

    await User.findByIdAndUpdate(followerId, { $inc: { following: 1 } })
    await User.findByIdAndUpdate(followingId, { $inc: { followers: 1 } })

    res.json({
      status: 'OK',
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

    const data = await User.findById(userId)

    res.json({
      status: 'OK',
      data: data.followers
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

  } catch(error) {

  }

}

module.exports = {
  createFollow,
  fetchFollowers,
  fetchFollowings,
}