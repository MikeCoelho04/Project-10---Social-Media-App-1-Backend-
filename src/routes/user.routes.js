const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

const {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers')

router.get('/users', fetchUsers)

router.post('/users', upload.single('profilePic') ,createUser)

router.patch('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)

module.exports = router
