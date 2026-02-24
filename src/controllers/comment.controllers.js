const Comment = require('../models/comment.models')
const Post = require('../models/post.models')
const User = require('../models/user.models')

const fetchComments = async (req, res) => {

  try {

    const { post } = req.query

    const postComment = await Comment.find({ post }).populate('author', 'username fullName').populate('post', 'content')

    res.json({
      status: 'OK',
      data: postComment
    })

  } catch(error) {

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

const createComment = async (req, res) => {

  try {

    const { post, author, content } = req.body

    const user = await User.findByid(author)
    if(!user) {
      return res.status(400).json ({
        status: 'FAILED',
        message: 'Author not found'
      })
    }

    const postToComment = await Post.findById(post)
    if(!postToComment) {
      return res.status(400).json ({
        status: 'FAILED',
        message: 'Post not found'
      })
    }
     

    await Comment.create ({
      post,
      author,
      content,
    })

    res.json({
      status: 'OK',
      message: 'Comment created successfully!'
    })

  } catch(error) {

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

} 

const updateComment = async (req, res) => {

  try {

    const { id } = req.params
    const { content } = req.body
    await Comment.findByIdAndUpdate(id, { content })

    res.json({
      status: 'OK',
      message: 'Comment updated successfully!'
    })

  } catch(error) {

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

const deleteComment = async (req, res) => {

  try {

    const { id } = req.params
    await Comment.findByIdAndDelte(id)
    res.json({
      status: 'OK',
      message: 'Comment deleted successfully!'
    })
 
  } catch(error) {

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

module.exports = {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
}