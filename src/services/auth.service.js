const { UserService } = require("./user.service")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;


// register
const authRegister = async (data) => {
    return await UserService.create(data)
 }

// login

const authLogin = async (data) => {
    const user = await UserService.getOneByEmail(data.email)

    if(!user) return false

    const valid_password = bcrypt.compareSync(data.password, user.password)

    if (!valid_password) return false


    const token = jwt.sign({ userID: user._id, }, SECRET_KEY)

    const payload = {
        token,
        id: user._id,
    }
    return payload
 }

module.exports.AuthService = {authLogin, authRegister }
