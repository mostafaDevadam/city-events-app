const { AuthService } = require("../services/auth.service")


const register = async (req, res) => {
    const service = await AuthService.authRegister(req.body)
    res.json(service)
}

const login = async (req, res) => {
   const service =await AuthService.authLogin(req.body)
    res.json(service)
}


module.exports.AuthController = { register, login }
