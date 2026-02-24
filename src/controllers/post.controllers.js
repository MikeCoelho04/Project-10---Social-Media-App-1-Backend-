const Post = require('../models/post.models')
const User = require('../models/user.models')

const fetchPosts = async (req, res) => {

  try {

    const { userId } = req.query

    const posts = await Post.find({ author }).populate('author', 'username fullName').populate('likes', 'username fullName')

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

    await Post.create({
      author,
      content,
    })

    res.json({
      status: 'OK',
      message: 'Post created successfully!'
    })

  } catch(error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to create user'
    })    

  }

}

const updatePost = async (req, res) => {

  try {

    const { id } = req.params
    const { content } = req.body

    await Post.findByIdAndUpdate(id, { content })

    res.json({
      status: 'OK',
      message: 'Post updated successfully'
    })

  } catch(error) {

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

const togglePostlike = async (req, res) => {

  try {

    const { id } = req.params
    const { userId } = req.body

    const post = await Post.findById(id)

    if(!post) {

      return res.status(400).json({
        status: 'FAILED',
        messag: 'Post not found'
      })

    }

    const alreadyLiked = post.likes.some(id => id.toString() == userId)

    if(alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() != userId)
    } else {
      post.likes.push(userId)
    }

    await post.save()

    res.json({
      status: 'OK',
      message: `Post ${alreadyLiked ? 'unliked' : 'liked'} successfully`
    })

  } catch(error) {



  }

}

module.exports = {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  togglePostlike,
}