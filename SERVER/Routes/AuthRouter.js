const express = require("express");
const Router = express.Router();
const { CreateUser, UserSignIn, UserSignOut, CheckAuth } = require("../Controllers/AuthController")


Router.post("/createUser", CreateUser)
Router.post("/signin", UserSignIn)
Router.get("/signout", UserSignOut)
Router.post("/checkauth", CheckAuth)


module.exports = Router
