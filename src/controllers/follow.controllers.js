const Follow = require('../models/follow.models')
const User = require('../models/user.models')

const createFollow = async (req, res) => {

  try {

    const { followingId } = req.params

    const { followerId } = req.body
    

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

      // Trocar isto para receber numero.
      // Colocar no follow array para mostrar o id de quem segue ou é seguido, depois com populate mostrar userName e fullName.

      await User.findByIdAndUpdate(followerId, { $inc: { numberOfFollowing: -1 } })
      await User.findByIdAndUpdate(followingId, { $inc: { numberOfFollowers: -1 } })

      return res.json({
        status: 'OK',
        message: 'Unfollowed successfully'
      })

    }

    await Follow.create({ followerId, followingId })

    await User.findByIdAndUpdate(followerId, { $inc: { numberOfFollowing: 1 } })
    await User.findByIdAndUpdate(followingId, { $inc: { numberOfFollowers: 1 } })

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

module.exports = {
  createFollow,
  fetchFollowers,
  fetchFollowings,
}