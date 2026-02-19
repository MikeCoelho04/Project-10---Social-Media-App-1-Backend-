const User = require('../models/user.models')

const fetchUsers = async (req, res) => {

  try {

    const users = await User.find()

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

    const { username, email, fullName, bio, avatar } = req.body

    await User.create({
      username,
      email,
      fullName,
      bio,
      avatar,
    })

    res.json({
      status: 'OK',
      message: 'User created!'
    })

  } catch (error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to create User!'
    })

  }

}

const updateUser = async (req, res) => {

  try {

    const { id } = req.params
    const { fullName, bio } = req.body
    await User.findByIdAndUpdate(id, { fullName, bio })

    res.json({
      status: 'OK',
      message: 'User updated successfully'
    })

  } catch(error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to update user'
    })

  }

}

const deleteUser = async (req, res) => {

  try {

    const { id } = req.params

    await User.findByIdAndDelete(id)

    res.json({
      status: 'OK',
      message: 'User deleted!'
    })

  } catch (error) {

    res.status(500).json({
      status: 'FAILED',
      message: 'Failed to delete User'
    })

  }

}

module.exports = {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
}