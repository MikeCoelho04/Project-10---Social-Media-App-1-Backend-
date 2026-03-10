const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const Post = require('../models/post.models')
const Like = require('../models/like.models')
const Comment = require('../models/comment.models')

const isUserLoggedIn = (req, res, next) => {

  try {

    const { token } = req.headers
  
    const { _id } = jwt.verify(token, process.env.PRIVATE_KEY)
  
    req._id = _id
    
    next()
  
  } catch(error) {

    res.status(401).json({
      status: 'FAILED',
      message: 'You need to login first before access this content'
    })

  }


}

const isUserLoggedOff = (req, res, next) => {

  try {

    const { token } = req.headers

    // O jwt verifica se está válido ou não, se o user ainda tiver um token ele não pode aceder mas se tiver mas está inválido já pode, portanto temos que primeiro fazer uma verificação do token

    const isValidToken = jwt.verify(token, process.env.PRIVATE_KEY)

    if(isValidToken) {
      
      res.status(403).json({
        status: 'FAILED',
        message: 'You need to logout to access this service'
      })

    } else {
      next()
    }

  } catch (error) {

    next()

  }

} 

const isProfileOwner = (req, res, next) => {

  try {

    const { token } = req.headers

    const { id } = req.params

    const { _id } = jwt.verify(token, process.env.PRIVATE_KEY)

    if( id == _id) {
      next()
    } else {
      res.status(403).json({
        status: 'FAILED',
        message: `You don't have permission to update/delete this user`
      })
    }

  } catch(error) {

    res.status(403).json({
      status: 'FAILED',
      message: `You don't have permission to update/delete this user`
    })

  }

}

const isPostOwner = async (req, res, next) => {

  try {  
    const { token } = req.headers

    const { postId } = req.params 

    const { _id } = jwt.verify(token, process.env.PRIVATE_KEY)

    const post = await Post.findById(postId)

    const postAuthor = post.author

    if(_id == postAuthor) {

      next()

    } else {

      res.status(403).json({
        status: 'FAILED',
        message: `You don't have permission to update/delete this post.`
      })

    }
  } catch(error) {

    console.log(error)

    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong, please try again later'
    })

  }

}

const isCommentOwner = async (req, res, next) => {

  const { token } = req.headers

  const { _id } = jwt.verify(token, process.env.PRIVATE_KEY)

  const { commentId } = req.params

  const { authorId } = await Comment.findById(commentId)
  
  if(_id == authorId.toString()) {

    next()

  } else {

    res.status(403).json({
      status: 'FAILED',
      message: `You don't have permision to update/delete this comment`
    })

  }

}

module.exports = {
  isUserLoggedIn,
  isUserLoggedOff,
  isProfileOwner,
  isPostOwner,
  isCommentOwner,
}