const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const jwt = require('jsonwebtoken')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
 // CADASTRO DE USUÁRIO
  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body

    if (!name) {
      res.status(422).json({ message: 'Nome é obrigatório!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'Email é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'Senha é obrigatória!' })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'Coonfirmação de senha é obrigatória!' })
      return
    }
    if (confirmpassword !== password) {
      res
        .status(422)
        .json({ message: 'A senha e a confirmação precisam ser iguais!' })
      return
    }

    // checa se o usuario ja existe
    const userExists = await User.findOne({ email: email })
    if (userExists) {
      res.status(422).json({ message: 'Esse email já está sendo utilizado!' })
      return
    }

    // criar senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

   
    const user = new User({
      name,
      email,
      password: passwordHash
    })

    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  // LOGIN DE USUÁRIO
  static async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'Email é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'Senha é obrigatória!' })
      return
    }

    const user = await User.findOne({ email: email })
    if (!user) {
      res.status(422).json({ message: 'Email ou senha inválidos' })
      return
    }

    
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(422).json({ message: 'Email ou senha inválidos' })
      return
    }

    await createUserToken(user, req, res)
  }

// CHECAR USUÁRIO PELO TOKEN JWS
  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

 // GET DE USUÁRIO PELO ID
  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json({ user })
  }

 // EDITAR INFORMAÇÕES DO USUÁRIO
  static async editUser(req, res) {
    
    const token = getToken(req)
    const user = await getUserByToken(token)

    const { name, email, password, confirmpassword } = req.body

    if (req.file) {
      user.image = req.file.filename
    }

  
    if (!name) {
      res.status(422).json({ message: 'Nome é obrigatório!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'Email é obrigatório!' })
      return
    }

    // checa se email já está sendo utilizado
    const userExists = await User.findOne({ email: email })
    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Email já está sendo utilizado' })
      return
    }
    user.email = email

    if (password != confirmpassword) {
      res.status(422).json({ message: 'As senhas não conferem!' })
      return
    } else if (password === confirmpassword && password != null) {
      
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash
    }
    try {
      await User.findOneAndUpdate(
        { _id: user.id },
        { $set: user },
        { new: true }
      )

      res.status(200).json({ message: 'Informações atualizadas com sucesso!' })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}
