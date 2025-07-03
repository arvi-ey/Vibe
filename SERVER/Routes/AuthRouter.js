const express = require("express");
const Router = express.Router();
const { CreateUser } = require("../Controllers/AuthController")


Router.post("/createUser", CreateUser)


module.exports = Router
