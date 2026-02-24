const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const attachUsername = require('../middlewares/attachUsername')

const {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers')

router.get('/users', fetchUsers)

router.post('/users', upload.single('avatarUrl'), createUser)

router.patch('/users/:id', attachUsername, upload.single('avatarUrl'), updateUser)

router.delete('/users/:id', deleteUser)

module.exports = router
