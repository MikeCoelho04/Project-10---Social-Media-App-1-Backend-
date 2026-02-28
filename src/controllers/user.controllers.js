const User = require('../models/user.models')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs/promises')
const Follow = require('../models/follow.models')
const Post = require('../models/post.models')
const Like = require('../models/like.models')
const Comment = require('../models/comment.models')
const mongoose = require('mongoose')

const fetchUsers = async (req, res) => {

  try {

    const users = await User.find()

    users.map(user => {

      user.avatarUrl = process.env.BASE_URL + user.avatarUrl 

    })

    res.json({
      status: 'OK',
      data: users,
    })

  } catch(error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

const fetchSingleUser = async (req, res) => {

  try {

    const { id } = req.params

    const users = await User.findById(id)

    res.json({
      status: 'OK',
      data: users,
    })

  } catch(error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

const createUser = async (req, res) => {

  try {

    const { email, username, fullName, bio } = req.body

    // To change to the correct file name (avatarUrl)

    const ext = path.extname(req.file.originalname)

    const newFileName = `${username}-${Date.now()}${ext}`

    const oldPath = req.file.path
    const newPath = path.join(path.dirname(oldPath), newFileName)

    await fs.rename(oldPath, newPath)

    await User.create({
      email,
      username,
      fullName,
      bio,
      avatarUrl: `uploads/profilePics/${newFileName}`,
    })

    res.json({
      status: 'OK',
      message: 'User created!'
    })

  } catch (error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to create User!',
      error
    })

  }

}

const updateUser = async (req, res) => {

  try {

    const { id } = req.params
    const { username, fullName, bio } = req.body

    if(req.file) {

      const ext = path.extname(req.file.originalname)

      const newFileName = `${username}-${Date.now()}${ext}`

      const oldPath = req.file.path
      const newPath = path.join(path.dirname(oldPath), newFileName)

      await fs.rename(oldPath, newPath)

      const user = await User.findByIdAndUpdate(id)

      user.avatarUrl = `/uploads/profilePics/${newFileName}`

      await user.save()

    }

    await User.findByIdAndUpdate(id, { username, fullName, bio })

    res.json({
      status: 'OK',
      message: 'User updated successfully'
    })

  } catch(error) {

    console.log(error)

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to update user',
      error: error
    })

  }

}

const deleteUser = async (req, res) => {

  try {

    const { id } = req.params

    const followingRelations = await Follow.find({ followerId: id })

    const followingIds = followingRelations.map(f => f.followingId)

    if(followingIds.length > 0) {

      await User.updateMany(
        { _id: { $in: followingIds } }, { $inc: { numberOfFollowers: -1 } }
      )

    }

    const followerRelations = await Follow.find({ followingId: id })

    const followerIds = followerRelations.map(f => f.followerId)

    if(followerIds.length > 0) {
      
      await User.updateMany(
        { _id: { $in: followerIds } }, { $inc: { numberOfFollowing: -1 } }
      )

    }

    await Follow.deleteMany ({ 

      $or: [
        { followerId: id },
        { followingId: id }
      ]

    })

    const userPosts = await Post.find({ author: id }).select('_id').lean()
    const userPostIds = userPosts.map(p => p._id)

    const commentStats = await Comment.aggregate([
      {
        $match: {
          authorId: new mongoose.Types.ObjectId(id),
          ...(userPostIds.length ? { postId: { $nin: userPostIds } } : {})
        }
      },
      { $group: { _id: '$postId', n: { $sum: 1 } } }
    ])

    if(commentStats.length > 0) {
      const bulk = commentStats.map(c => ({
        
        updateOne: {
          filter: { _id: c._id },
          update: { $inc: { commentCount: -c.n } }
        }

      }))

      await Post.bulkWrite(bulk)

    }


    await Comment.deleteMany({

      $or: [
        { authorId: id },
        ...(userPostIds.length ? [{ postId: { $in: userPostIds }}] : [] )
      ]

    })

    const likeStats = await Like.aggregate([

      {
        $match: {
          userId: new mongoose.Types.ObjectId(id),
          ...(userPostIds.length ? { postId: { $nin: userPostIds } } : {} )
        }
      },
      { $group: { _id: '$postId', n: { $sum: 1 } } }

    ])

    if(likeStats.length) {

      const bulk = likeStats.map(l => ({
        
        updateOne: {
          filter: { _id: l._id },
          update: { $inc: { likesCount: -l.n } }
        }

      }))

      await Post.bulkWrite(bulk)

    }

    await Like.deleteMany({
      $or: [
        { userId: id },
        ...(userPostIds.length ? [{ postId: { $in: userPostIds } }] : [])
      ]
    })

    await Post.deleteMany({ author: id })



    await User.findByIdAndDelete(id)

    res.json({
      status: 'OK',
      message: 'User deleted!'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to delete User'
    })

  }

}

module.exports = {
  fetchUsers,
  fetchSingleUser,
  createUser,
  updateUser,
  deleteUser,
}
