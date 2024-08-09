// const gemini = require("../Helper/Gemini");
// const { signToken } = require('../Helper/Jwt')



// class PromptController {
//   static async CreatePrompt(request, respond) {
//     try {
//       // console.log(request.body)
//       const { destination, date1, date2, budget, persons } = request.body;

//       const prompt = await gemini(destination, date1, date2, budget, persons);
//       console.log(prompt,"ini propmtnya")

//       const promptPayload = {
//         prompt : prompt
//       }

//       const token = signToken(promptPayload)

//     //   console.log(token)

//       respond.status(200).json({
//         token
//       });
//     } catch (error) {
//         console.log(error.name)
//     }
//   }
// }

// module.exports = PromptController;
