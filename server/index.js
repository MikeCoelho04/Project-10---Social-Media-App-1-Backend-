const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { urlencoded } = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config()

const userRoutes = require('./src/routes/user.routes')
const postRoutes = require('./src/routes/post.routes')
const commentRoutes = require('./src/routes/comment.routes')
const likeRoutes = require('./src/routes/like.routes')
const followRoutes = require('./src/routes/follow.routes')
const friendRequestRoutes = require('./src/routes/friendsRequest.routes')

const app = express()

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}))

app.use(cookieParser())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('', userRoutes)
app.use('', postRoutes)
app.use('', commentRoutes)
app.use('', likeRoutes)
app.use('', followRoutes)
app.use('', friendRequestRoutes)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Social Media API',
    now: new Date(),
    status: 'OK',
  })
})


mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB is UP')
    app.listen(process.env.PORT, () => {
      console.log('Server is UP')
    })
  })
  .catch((error) => {console.log('Falied to connect to the server', error)}
)
