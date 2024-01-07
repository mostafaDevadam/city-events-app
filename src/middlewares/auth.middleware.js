const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


const verifyAuth = (req, res, next) => {
    const token = getToken(req)
    if(!token) return res.status(401).send("UnAuth")

    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified
        next()
    } catch (error) {
       res.status(400).send("Invalid token")
    }
}


const getToken = (req) => req.header("auth-token")



module.exports = { verifyAuth }
