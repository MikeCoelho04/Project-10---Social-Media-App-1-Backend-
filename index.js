const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { urlencoded } = require('body-parser')
dotenv.config()

const userRoutes = require('./src/routes/user.routes')

const app = express()

app.use(express.urlencoded({extended: false}))

app.use(express.static('uploads'))

app.use('', userRoutes)

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
  .catch((error) => {console.log('Falied to connect to the server', error)})
