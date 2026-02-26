const Comment = require('../models/comment.models')
const Post = require('../models/post.models')
const User = require('../models/user.models')

const createComment = async (req, res) => {

  try {

    const { postId } = req.params

    const { authorId, text } = req.body

    const user = await User.findById(authorId)

    if(!user) {
      return res.status(400).json ({
        status: 'FAILED',
        message: 'Author not found'
      })
    }

    const postToComment = await Post.findById(postId)

    if(!postToComment) {
      return res.status(400).json ({
        status: 'FAILED',
        message: 'Post not found'
      })
    }
     
    await Comment.create ({
      postId,
      authorId,
      text,
    })

    await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } })

    res.json({
      status: 'OK',
      message: 'Comment created successfully!'
    })

  } catch(error) {

    console.log(error)

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

} 

const fetchPostComments = async (req, res) => {

  try {

    const { postId } = req.params

    const postComment = await Comment.find({ postId })
    
    //.populate('author', 'username fullName').populate('post', 'content')

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

const fetchComment = async (req, res) => {

  try {

    const { commentId } = req.params

    const comment = await Comment.findById(commentId)
    
    //.populate('author', 'username fullName').populate('post', 'content')

    res.json({
      status: 'OK',
      data: comment
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

    const { commentId } = req.params
    const { text } = req.body

    await Comment.findByIdAndUpdate(commentId, { text })

    res.json({
      status: 'OK',
      message: 'Comment updated successfully!'
    })

  } catch(error) {

    console.log(error)

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

const deleteComment = async (req, res) => {

  try {

    const { commentId } = req.params
    
    const comment = await Comment.findById(commentId)

    if(!comment) {

      return res.status(500).json({
        status: 'FAILED',
        message: 'Comment not found'
      })

    }

    await Comment.findByIdAndDelete(commentId)



    res.json({
      status: 'OK',
      message: 'Comment deleted successfully!'
    })
 
  } catch(error) {

    console.log(error)

    res.status(500).json ({
      status: 'FAILED',
      message: 'Something went wrong'
    })

  }

}

module.exports = {
  createComment,
  fetchPostComments,
  fetchComment,
  updateComment,
  deleteComment,
}