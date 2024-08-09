const { User } = require('../models/index')
const { compare } = require('../Helper/Bcrypt')
const { signToken } = require('../Helper/Jwt')
const { OAuth2Client }= require('google-auth-library');

class UserController{

    static async handleRegister(request , respond , next){
        try {

            const {Username , Email , Password , Gender} = request.body

            const NewUser  = await User.create({
                Username , Email , Password , Gender
            })

            respond.status(201).json({
                message: "Success create new user",
                NewUser: {
                    username : NewUser.Username,
                    email: NewUser.Email
                }
            })
        } catch (error){
            console.log(error)
            let status = 500
            let message = "Internal Server Error"

            if(error.name === "SequelizeUniqueConstraintError"){
                status = 400
                message = error.errors[0].message
            }

            if(error.name === "SequelizeValidationError"){
                status = 400
                message = error.errors[0].message
            }

            if (error.name == 'SequelizeDatabaseError' || error.name == 'SequelizeForeignKeyConstraintError') {
                status = 400
                message = 'Invalid input'
            }

            respond.status(status).json({
                message
            })
        }
    }


    static async handleLogin(request , respond , next){
        try {
            const { Email , Password } = request.body 
            if(!Email || !Password) throw {name: "InvalidLogin"}

            const UserLogin = await User.findOne({
                where:{
                    Email
                }
            })
            console.log(UserLogin)
            if(!UserLogin) throw {name:"Email not found"}
            if(!compare(Password , UserLogin.Password)) throw {name: "password not matched"}

            const payload = {
                id: UserLogin.id,
                email: UserLogin.Email,
            }
            console.log(payload)
            const access_token = signToken(payload)
            
            respond.status(200).json({
                message: `Welcome Back ${Email}`,
                access_token   
            })
            
        } catch (error) {
            console.log(error)

            let status = 500
            let message = "Internal Server Error"

            if(error.name == "InvalidLogin"){
                status = 400
                message = "Email or password is required"
            }
        
            if(error.name == "Email not found"){
                status = 404
                message = "Invalid email/password"
            }
        
            if(error.name == "password not matched"){
                status = 401
                message = "Invalid email/password"
            }
            respond.status(status).json({
                message
            })
        }
    }

    static async ReadProfile( request , respond , next){
        try {
            const {userId} = request.loginInfo

            const findProfile = await User.findOne({
                where:{
                    id: userId
                },
                attributes: { exclude: ['Password' , 'createdAt' , 'updatedAt' ] }
            })
            if(!findProfile) throw {name: "User not Found"}
            respond.status(200).json({
                findProfile
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async UpdateProfile( request , respond){
        try {

            const {userId} = request.loginInfo

            const findProfile = await User.findByPk(userId)

            if(!findProfile) throw {name: "User not Found"}

            const { Username , Gender } = request.body

            const updateMyProfile = await User.update({Username , Gender },{
                where:{
                    id : userId
                }
            })
            respond.status(200).json({
                message: "Success update my profile"
            })
        } catch (error) {
            console.log(error)
        }
    }


    static async GoogleLogin(request , respond , next ){
        try {
            const { token } = request.headers
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "215875608777-uf5ispf9rvd1l0vi5ntgqogeag719gu0.apps.googleusercontent.com",
            });

            console.log(ticket,"<<<<<<<<<?????")

            const payload = ticket.getPayload();

            console.log(payload,"<<<//")

            const [user, created] = await User.findOrCreate({
                where: {
                    Email: payload.email
                },
                defaults: {
                    Username:"NoNE",
                    Email: payload.email,
                    Password:"password_google",
                    Gender : "Undefined"

                },
                hooks: false
            })

            console.log(user)

            const access_token = signToken({
                id: user.id,
                Email : user.Email,
            })
            respond.status(200).json({
                message: "Success Login With Google",
                access_token
            })
            
        } catch (error) {
            console.log(error)
        }

    }

}


module.exports = UserController