const express = require("express");
const Router = express.Router();
const { CreateUser, UserSignIn } = require("../Controllers/AuthController")


Router.post("/createUser", CreateUser)
Router.get("/signin", UserSignIn)


module.exports = Router
