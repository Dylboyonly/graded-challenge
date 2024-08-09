
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
// console.log(jwt)

const signToken = (payload)=>{
    return jwt.sign(payload,secretKey)
}

const VerifyToken = (token) =>{
    return jwt.verify(token,secretKey)
}

module.exports ={ signToken , VerifyToken }