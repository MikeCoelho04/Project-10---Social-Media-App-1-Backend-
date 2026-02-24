const Users = require('../models/user.models')

const attachUsername = async (req, res, next) => {

  try {

    const { id } = req.params
    let { username } = req.body || {}
  
    if(!username) {

      if(!id) {

        return res.status(400).json ({
          status: 'FAILED',
          message: 'Missing userId'
        })

      }

      const user = await Users.findById(id).select('username')

      if(!user) {
        return res.status(400).json({
          status: 'FAILED',
          message: 'User not found'
        })
      }

      username = user.username
    }
  
    req.usernameForUpload = username
  
    next()

  } catch(error) {

    next(error)

  }


}

module.exports = attachUsername