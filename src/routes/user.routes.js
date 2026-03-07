const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

const {
  isUserLoggedIn,
  isUserLoggedOff,
  isProfileOwner,
} = require('../middlewares/auth.middlewares')

const {
  fetchUsers,
  fetchSingleUser,
  userSignin,
  userLogin,
  userLogout,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers')

router.get('/users', isUserLoggedIn, fetchUsers)

router.get('/users/:id', isUserLoggedIn, fetchSingleUser)

router.post('/users/signup', isUserLoggedOff, upload.single('avatarUrl'), userSignin)

router.post('/users/signin', isUserLoggedOff, userLogin)

router.post('/users/logout', isUserLoggedIn, userLogout)

router.patch('/users/:id', isUserLoggedIn, isProfileOwner, upload.single('avatarUrl'), updateUser)

router.delete('/users/:id', isUserLoggedIn, isProfileOwner, deleteUser)

module.exports = router
