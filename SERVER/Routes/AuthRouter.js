const express = require("express");
const Router = express.Router();
const { VerifyEmail, CreateUser, UserSignIn, UserSignOut, CheckAuth, RequestEmailVerification } = require("../Controllers/AuthController")


Router.post("/createUser", CreateUser)
Router.post("/signin", UserSignIn)
Router.get("/signout", UserSignOut)
Router.post("/checkauth", CheckAuth)
Router.post("/requestverificationcode", RequestEmailVerification)
Router.post("/verifyEmail", VerifyEmail)


module.exports = Router
