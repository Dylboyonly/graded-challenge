
const  { User , TripPlan } = require('../models/index')

const Authorization = async(request, respond , next)=>{
    try {
        const { userId } = request.loginInfo
        // console.log(userId , "ini userid")

        const user = await User.findByPk(userId)
        // console.log(user.id)

        if(!user) throw{ name:"Forbidden" }

        // console.log("hahahha")
        const { id } = request.params
        // console.log(id , "ini idnya")

        const spesifikPlan = await TripPlan.findByPk(id)
        // console.log(spesifikPlan.UserId)
        if(!spesifikPlan) throw{name: "Data not found"}

        if(user.id !== spesifikPlan.UserId) throw{name:"Forbidden"}
        next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = Authorization