const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

const {
  fetchUsers,
  fetchSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers')

router.get('/users', fetchUsers)

router.get('/users/:id', fetchSingleUser)

router.post('/users', upload.single('avatarUrl'), createUser)

router.patch('/users/:id', upload.single('avatarUrl'), updateUser)

router.delete('/users/:id', deleteUser)

module.exports = router
