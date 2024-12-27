const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, { dbName: 'Calendario' })
    console.log('Conectado ao MongoDB!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
