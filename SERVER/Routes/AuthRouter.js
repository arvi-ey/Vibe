const express = require("express");
const Router = express.Router();
const { CreateUser, UserSignIn, UserSignOut } = require("../Controllers/AuthController")


Router.post("/createUser", CreateUser)
Router.get("/signin", UserSignIn)
Router.get("/signout", UserSignOut)


module.exports = Router
