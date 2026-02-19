const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uplaods/')
  },
  filename: function (req, file, cb) {

    const now = Date.now()
    const random = Math.floor(Math.random() * 10000 + 10000) 
    const extension = path.extname(file.originalname)

    const customFilename = `user-${random}-${now}${extension}` 

    cb(null, customFilename)

  }
})

const upload = multer({ storage })

module.exports = upload