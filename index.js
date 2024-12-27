const dotenv = require('dotenv')
const database = require('./db/conn')
const express = require('express')
const cors = require('cors')

// import routes
const UserRoutes = require('./routes/UserRoutes')
const EventRoutes = require('./routes/EventRoutes')

// config
dotenv.config()
const app = express()
database()

// config json
app.use(express.json())

// cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
app.unsubscribe(cors({ credentials: true, origin: 'http://localhost:3000' }))

// imagens para pasta public
app.use(express.static('public'))

// routes
app.use('/users', UserRoutes)
app.use('/events', EventRoutes)

app.listen(3001)
console.log('Servidor rodando na porta 3001')
