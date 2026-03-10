const multer = require('multer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const uploadPath = path.join(process.cwd(), 'uploads', 'profilePics') 
fs.mkdirSync(uploadPath, { recursive: true })

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },

  filename: function (req, file, cb) {

    const extension = path.extname(file.originalname)

    cb(null, `${crypto.randomUUID()}${extension}`)  // Temporary name

  }

})

const upload = multer({ storage })

module.exports = upload