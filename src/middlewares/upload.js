const multer = require('multer')
const path = require('path')
const fs = require('fs')

const Users = require('../models/user.models')

const uploadPath = path.join(process.cwd(), 'uploads', 'profilePics') 

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'uploads/profilePics')
  },

  filename: function (req, file, cb) {

    const { username } = req.body  

    let photoUsername = req.usernameForUpload

    console.log(username)
    console.log(photoUsername)

    if(username) {

      photoUsername = username

    }

    const now = Date.now()
    const extension = path.extname(file.originalname)

    const customFileName = `${photoUsername}-${now}${extension}` 

    cb(null, customFileName)

  }

})

const upload = multer({ storage })

module.exports = upload