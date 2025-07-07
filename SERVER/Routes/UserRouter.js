const express = require("express")
const Router = express.Router()
const { GetUser, UpdateUser, UploadImage } = require("../Controllers/UserController")

Router.get("/getuser/:uid", GetUser)
Router.patch("/updateuser/:uid", UpdateUser)
Router.patch("/uploadImage/:uid", UploadImage)

module.exports = Router
