const express = require("express")
const Router = express.Router()

const { HandleFriendRequest, CheckIsFriend } = require("../Controllers/FriendController")

Router.post("/sendrequest", HandleFriendRequest)
Router.post("/checkfriend", CheckIsFriend)

module.exports = Router