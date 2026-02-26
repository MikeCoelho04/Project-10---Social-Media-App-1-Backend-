const Post = require('../models/post.models')
const User = require('../models/user.models')
const Like = require('../models/like.models')
const mongoose = require('mongoose')

const togglePostlike = async (req, res) => {

  try {

    const { postId } = req.params
    const { userId } = req.body

    console.log(postId)

    //const postId = id

    const post = await Post.findById(postId)

    if(!post) {
      return  res.status(400).json({
        status: 'FAILED',
        message: 'Post not found'
      })
    }

    if(!userId) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'Missing userId'
      })
    }

    if(!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'Invalid userId, please enter a valid one'
      })
    }

    const existingLike = await Like.findOne({ postId, userId }).select('_id')

    if(existingLike) {
      await Like.deleteOne({ _id: existingLike._id })
      await Post.updateOne({ _id: postId }, { $inc: { likesCount: -1 } })
      return res.status(200).json({
        status: 'OK',
        liked: false,
        message: 'Post disliked'
      })
    }

    await Like.create({ postId, userId })
    await Post.findByIdAndUpdate(postId, { $inc: {likesCount: 1} })

    res.status(200).json({
      status: 'OK',
      liked: true,
      message: 'Post liked'
    })

  } catch(error) {

    console.log(error)

  }

}

module.exports = togglePostlike