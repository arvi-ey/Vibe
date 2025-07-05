const express = require("express")
const Router = express.Router()
const { GetUser, UpdateUser } = require("../Controllers/UserController")

Router.get("/getuser/:uid", GetUser)
Router.patch("/updateuser/:uid", UpdateUser)

module.exports = Router
