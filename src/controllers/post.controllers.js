const Post = require('../models/post.models')
const User = require('../models/user.models')
const Like = require('../models/like.models')
const path = require('path')
const fs = require('fs/promises')
const mongoose = require('mongoose')

const fetchPosts = async (req, res) => {

  try {

    // const posts = await Post.find({ author }).populate('author', 'username fullName').populate('likes', 'username fullName')

    const posts = await Post.find()

    if(posts.length == 0) {
      res.json({
        status: 'OK',
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

const createPost = async (req, res) => {

  try {

    const { author, content } = req.body

    const user = await User.findById(author)

    if(!user) {

      return res.status(400).json({
        status: 'FAILED',
        message: 'Author not found'
      })

    }

    const post = await Post.create({
      author,
      content,
    })

    await User.findByIdAndUpdate(author, { $inc: {numberOfPosts: 1} })

    // To change to the correct file name

    const ext = path.extname(req.file.originalname)

    const newFileName = `post-${post._id}-${Date.now()}${ext}`

    const oldPath = req.file.path
    const newPath = path.join(path.dirname(oldPath), newFileName)

    await fs.rename(oldPath, newPath)

    const postId = await Post.findById(post._id)

    postId.mediaUrls = `/uploads/postsMedia/${newFileName}`

    await postId.save()

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

    const { id } = req.params
    const { content } = req.body

    if(req.file) {

      const ext = path.extname(req.file.originalname)

      const newFileName = `post-${id}-${Date.now()}${ext}`

      const oldPath = req.file.path
      const newPath = path.join(path.dirname(oldPath), newFileName)

      await fs.rename(oldPath, newPath)

      const post = await Post.findByIdAndUpdate(id)

      post.mediaUrls = `/uploads/postsMedia/${newFileName}`

      await post.save()

    }


    await Post.findByIdAndUpdate(id, { content })

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

    const { id } = req.params

    await Post.findByIdAndDelete(id)

    res.json({
      status: 'Ok',
      message: 'Post deleted successfully!'
    })

  } catch(error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

module.exports = {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
}