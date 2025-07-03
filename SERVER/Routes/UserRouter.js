const express = require("express")
const Router = express.Router()
const { GetUser } = require("../Controllers/UserController")

Router.get("/getuser/:uid", GetUser)

module.exports = Router
