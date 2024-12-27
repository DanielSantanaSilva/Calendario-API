const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, { dbName: 'CALENDARIO' })
    console.log('Conectado ao MongoDB!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
