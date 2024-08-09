const { TripPlan } = require('../models/index')
const axios = require('axios')

class TripPlanController{

    static async CreatePlan(request , respond , next){
        try {
            const {userId} = request.loginInfo
            const {Title , Itineraries , DestinationId} = request.body
            // const{DestinationId} = request.params
            const newplan = await TripPlan.create({
                Title: Title,
                Itineraries,
                UserId:userId,
                DestinationId: DestinationId
            })
  
            respond.status(200).json({
                newplan
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async ReadMyPlan(request , respond , next){
        try {

            const {userId} = request.loginInfo

            const findMyPlan = await TripPlan.findAll({
                where:{
                    UserId: userId
                }
            })
            respond.status(200).json({
                findMyPlan
            })
            // next(findMyPlan)
        } catch (error) {
            console.log(error)
        }
    }

    static async ReadOnePlan(request , respond , next){
        try {
            // console.log(findMyPlan)
            const {id} = request.params
            console.log(id)

            const findOne = await TripPlan.findAll({
                where:{
                    id:id
                }
            })

            if(!findOne) throw{name: "data not found"}

            respond.status(200).json({
                findOne
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async DeleteMyPlan(request , respond , next){
        try {
            const {id} = request.params

            const Unwanted = await TripPlan.findByPk(id)
            console.log(Unwanted)

            const DeletePlan = await TripPlan.destroy({
                where: {
                    id:id
                }
            })
            respond.status(200).json({
                message: `Success Delete with id ${id}`
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async UpdateMyPlan(request , respond , next){
        try {
            const {id} = request.params
            console.log(id)

            const findOne = await TripPlan.findAll({
                where:{
                    id:id
                }
            })

            if(!findOne) throw{name: "data not found"}

          const {Title , Itineraries , UserId , DestinationId} = request.body

            const updatedPlan = await TripPlan.update({Title , Itineraries , UserId , DestinationId},{
                where:{
                    id: id
                }
            })
            respond.status(200).json({
                message: `Success delete My Plan with id ${id}`
            })
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = TripPlanController