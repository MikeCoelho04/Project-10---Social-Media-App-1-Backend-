const Post = require('../models/post.models')
const User = require('../models/user.models')
const Like = require('../models/like.models')
const Comment = require('../models/comment.models')
const path = require('path')
const fs = require('fs/promises')
const mongoose = require('mongoose')

const fetchPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate('author', 'fullName username avatarUrl')
      .sort({ createdAt: -1 })

    if(posts.length == 0) {
      return res.json({
        status: 'OK',
        data: [],
        message: 'This app doesnt have any posts yet'
      })
    }

    res.json ({
      status: 'OK',
      data: posts,
    })

  } catch(error) {

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong',
    })

  }

}

const fetchSinglePost = async (req, res) => {

  try {

    const { postId } = req.params

    const posts = await Post.findById(postId)

    res.json ({
      status: 'OK',
      data: posts,
    })

  } catch(error) {

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong',
    })

  }

}

const createPost = async (req, res) => {

  try {

    const author = req._id

    const { content } = req.body

    const user = await User.findById(author)

    if(!user) {

      return res.status(400).json({
        status: 'FAILED',
        message: 'Author not found'
      })

    }

    if (!content && !req.file) {
      return res.status(400).json({
        status: "FAILED",
        message: "A post must contain either text or media"
      })
    }

    const post = await Post.create({
      author,
      content,
    })

    await User.findByIdAndUpdate(author, { $inc: {numberOfPosts: 1} })

    // To change to the correct file name

    if(req.file) {

      const ext = path.extname(req.file.originalname)
  
      const newFileName = `post-${post._id}-${Date.now()}${ext}`
  
      const oldPath = req.file.path
      const newPath = path.join(path.dirname(oldPath), newFileName)
  
      await fs.rename(oldPath, newPath)
  
      const postId = await Post.findById(post._id)
  
      postId.mediaUrls = `/uploads/postsMedia/${newFileName}`
  
      await postId.save()

    }


    res.json({
      status: 'OK',
      message: 'Post created successfully!'
    })

  } catch(error) {

    console.log(error)

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to create a post',
    })    

  }

}

const updatePost = async (req, res) => {

  try {

    const { postId } = req.params
    const { content } = req.body

    if(req.file) {

      const ext = path.extname(req.file.originalname)

      const newFileName = `post-${postId}-${Date.now()}${ext}`

      const oldPath = req.file.path
      const newPath = path.join(path.dirname(oldPath), newFileName)

      await fs.rename(oldPath, newPath)

      const post = await Post.findByIdAndUpdate(postId)

      post.mediaUrls = `/uploads/postsMedia/${newFileName}`

      await post.save()

    }


    await Post.findByIdAndUpdate(postId, { content })

    res.json({
      status: 'OK',
      message: 'Post updated successfully'
    })

  } catch(error) {

    console.log(error)

    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

const deletePost = async (req, res) => {

  try {

    const { postId } = req.params

    const post = await Post.findById(postId).select('author').lean()

    if(!post) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Post not found'
      })
    }

    // Delete post respective comments and likes

    await Comment.deleteMany({ postId })
    await Like.deleteMany({ postId })

    await User.findByIdAndUpdate(post.author, { $inc: { numberOfPosts: -1 } })

    await Post.findByIdAndDelete(postId)

    res.json({
      status: 'Ok',
      message: 'Post deleted successfully!'
    })

  } catch(error) {

    console.log(error)

    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

module.exports = {
  fetchPosts,
  fetchSinglePost,
  createPost,
  updatePost,
  deletePost,
}
