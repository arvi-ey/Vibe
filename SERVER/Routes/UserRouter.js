const express = require("express")
const Router = express.Router()
const { GetUser, UpdateUser, UploadImage, GetProfiledata, GetSuggesteduser } = require("../Controllers/UserController")

Router.get("/getuser/:uid", GetUser)
Router.patch("/updateuser/:uid", UpdateUser)
Router.post("/uploadImage", UploadImage)
Router.post("/getsuggesition", GetSuggesteduser)
Router.get("/getprofileData/:uid", GetProfiledata)

module.exports = Router
