const User = require('../models/user.models')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs/promises')

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

    // To change the correct file name

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