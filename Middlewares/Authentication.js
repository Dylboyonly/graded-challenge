
const { VerifyToken } = require('../Helper/Jwt')
const { User } = require('../models/index')


const Authentication = async(request, respond , next)=>{
    try {

    // console.log(request.headers)
    const { authorization } = request.headers
    // console.log(authorization)
    
    if(!authorization) throw {name: "Unauthorized"}

    const token = authorization.split(' ')[1]
    // console.log(token)

    const payload = VerifyToken(token)
    // console.log(payload)

    const user = await User.findOne({
        where:{
            Email: payload.email
        }
    })
    // console.log(user, "<<<<<<")

    if(!user) throw {name: "Unauthorized"}

    request.loginInfo ={
        userId : payload.id,
        email: payload.email
    }
    // console.log(request.loginInfo)
    next()    
    } catch (error) {
        next(error)     
    }

}

module.exports = Authentication