
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: multer.memoryStorage() })


// Body Parser
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// Controllers
const DestinationController = require('./Controllers/DestiantionController')
const TripPlanController = require('./Controllers/TripPlanController')
const UserController = require('./Controllers/UserController')
// const PromptController = require('./Controllers/PromptController')


// Middlewares
const Authentication = require('./Middlewares/Authentication')
const Authorization = require('./Middlewares/Authorization')


// Rest Api

// User
app.post('/register',UserController.handleRegister)
app.post('/login',UserController.handleLogin)
app.post("/google-login" ,UserController.GoogleLogin)

app.use(Authentication)
app.get('/profile',UserController.ReadProfile)
app.put('/profile',UserController.UpdateProfile)
// Trip Planner

app.post('/MyPlan',TripPlanController.CreatePlan)
app.get('/MyPlan', TripPlanController.ReadMyPlan)
app.get('/MyPlan/:id',Authorization,TripPlanController.ReadOnePlan)
app.put('/MyPlan/:id' , Authorization,TripPlanController.UpdateMyPlan)
app.delete('/MyPlan/:id',Authorization, TripPlanController.DeleteMyPlan)


// Destination
app.post('/destination', upload.fields([
    { name: 'MainImage', maxCount: 1 },
    { name: 'OverviewImg', maxCount: 1 },
    { name: 'CultureImg', maxCount: 1 },
    { name: 'FoodImg', maxCount: 1 },
    { name: 'SiteImg', maxCount: 1 }
]),DestinationController.CreateDestination)
app.get('/destination',DestinationController.ReadAllDestination)
app.get('/destination/:id',DestinationController.ReadOneDestination)







module.exports=app