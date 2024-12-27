const multer = require('multer')
const path = require('path')

// destino do armazenamento de imagens
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = ''
    if (req.baseUrl.includes('users')) {
      folder = 'users'
    }

    cb(null, `public/images/${folder}`)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    )
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('A imagem precisa ser no formato jpg ou png!'))
    }
    cb(undefined, true)
  }
})

module.exports = { imageUpload }
