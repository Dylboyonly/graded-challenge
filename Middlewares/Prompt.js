// const gemini = require("../Helper/Gemini");
// const  { VerifyToken } = require('../Helper/Jwt')


// const CreatePrompt = async(request, respond, next)=>{
//     try {
//         // console.log(request.headers)
//         const {tokenauthorization} = request.headers
//         const tokenprompt = VerifyToken(tokenauthorization)
//         // console.log(tokenprompt)
//         request.prompt = {
//             data:tokenprompt
//         }
//         next()
//     } catch (error) {
//         console.log(error)
//     }
//   }


//   module.exports=CreatePrompt