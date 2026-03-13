const User = require('../models/user.models')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs/promises')
const Follow = require('../models/follow.models')
const Post = require('../models/post.models')
const Like = require('../models/like.models')
const Comment = require('../models/comment.models')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fetchUsers = async (req, res) => {

  try {

    const users = await User.find()

    if(!users) {

      return res.json({
        status: 'OK',
        message: 'There are no users to show'
      })

    }

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

const getCurrentUser = async (req, res) => {

  try {

    const user = await User.findById(req._id).select('-password -email')

    if (!user) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'User not found'
      })
    }

    res.json({
      status: 'OK',
      data: user
    })

  } catch (error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to fetch current user.'
    })

  }

}

const userSignin = async (req, res) => {

  try {

    const { email, username, password, fullName, bio, repeatedPassword } = req.body

    // Checks for uniques values

    const backendErrors = {}

    const existingEmail = await User.findOne({email})

    if(existingEmail) {
      backendErrors.email = 'This email is already in use!'
    }

    const existingUsername = await User.findOne({username})

    if(existingUsername) {
      backendErrors.username = 'This username is already in use!'
    }

    if (Object.keys(backendErrors).length > 0) {
      return res.status(409).json({
        errors: backendErrors
      })
    }

    // Check for format values

    if(email.length == 0 || username.length == 0 || fullName.length == 0 || password.length == 0 || repeatedPassword == 0) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'Some fields are required',
      })
    }

    if(!email.includes('@')) {
      return res.status(400).json({
        status: 'FAILED',
        message: 'A valid email is required!',
        field: 'email'
      })
    }

    if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-\/]).{8,}/.test(password)) {
      return res.status(400).json({
        message: `The password isn't weel formated`,
      })
    }

    if(password !== repeatedPassword) {
      return res.status(400).json({
        message: `The passwords don't match`
      })
    }




    // To change to the correct file name (avatarUrl)

    let avatarPath

    if(req.file) {

      const ext = path.extname(req.file.originalname)
  
      const newFileName = `${username}-${Date.now()}${ext}`
  
      const oldPath = req.file.path
      const newPath = path.join(path.dirname(oldPath), newFileName)
  
      await fs.rename(oldPath, newPath)

      avatarPath = `uploads/profilePics/${newFileName}`
    
    }


    const encryptedPassword = await bcrypt.hash(password, 10)

    await User.create({
      email,
      username,
      password: encryptedPassword,
      fullName,
      bio,
      avatarUrl: avatarPath,
    })

    const user = await User.findOne( { email } ).exec()

    const { _id } = user
 
    const token = jwt.sign({ _id }, process.env.PRIVATE_KEY, { expiresIn: '2 days' })

    res.cookie('token', token, { 
      httpOnly: true,  
      maxAge: 24*60*60*1000 
    })
    
    res.json({
      status: 'OK',
      message: 'User created!'
    })


  } catch (error) {

    console.log(error)

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to create User!',
      error
    })

  }

}

const userLogin = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne( { email } ).exec()

    if(email.length == 0 || password.length == 0 || !email.includes('@')) {

      return res.status(400).json ({
        status: 'FAILED',
        message: 'Some fields are required!'
      })

    }

    if(!user) {
      return res.status(401).json({
        status: 'FAILED',
        message: 'The login information you entered is incorrect.'
      })
    }

    const pwd = await bcrypt.compare(password, user.password)
    
    if(!pwd) {
      return res.status(401).json({
        status: 'FAILED',
        message: 'The login information you entered is incorrect.'
      })
    }

    const { _id } = user
 
    const token = jwt.sign({ _id }, process.env.PRIVATE_KEY, { expiresIn: '2 days' })
    
    res.cookie('token', token, { 
      httpOnly: true,  
      maxAge: 24*60*60*1000 
    })

    res.json({
      status: 'OK',
      message: 'User login successfully',
    })


  } catch(error) {

    console.log(error)

    res.json({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

const userLogout = async (req, res) => {
  
  try {

    const userId = req._id
  
    const user = await User.findById(userId)

    res.clearCookie('token')

    res.json({
      status: 'OK',
      message: `You logged out successfully. We hope to see you soon. Have a nice break ${user.username}`
    })

  } catch(error) {

    res.status(401).json({
      status: 'FAILED',
      message: 'Failed to logout'
    })

  }

}

const updateUser = async (req, res) => {

  try {

    const { id } = req.params
    const { username, fullName, bio } = req.body
    const updates = { username, fullName, bio }

    if(req.file) {

      const ext = path.extname(req.file.originalname)

      const newFileName = `${username}-${Date.now()}${ext}`

      const oldPath = req.file.path
      const newPath = path.join(path.dirname(oldPath), newFileName)

      await fs.rename(oldPath, newPath)
      updates.avatarUrl = `/uploads/profilePics/${newFileName}`

    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true })
      .select('-password')

    res.json({
      status: 'OK',
      message: 'User updated successfully',
      data: user,
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
  getCurrentUser,
  userSignin,
  userLogin,
  userLogout,
  updateUser,
  deleteUser,
}
