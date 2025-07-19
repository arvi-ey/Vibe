const express = require("express")
const Router = express.Router()

const { SendFriendRequest } = require("../Controllers/FriendController")

Router.post("/sendrequest", SendFriendRequest)

module.exports = Router