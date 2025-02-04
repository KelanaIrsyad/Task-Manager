const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res , next) => {
    const token = req.headers["authorization"];

    if(!token){
        return res.status(401).json({ message: "Token is required" })
    }

    try{
        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decode
    } catch(err){
        return res.status(401).json({ message: "Invalid token" })
    }
    return next()
}

module.exports = {
    isAuthenticated
}