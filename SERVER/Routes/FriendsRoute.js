const express = require("express")
const Router = express.Router()

const { HandleFriendRequest, CheckIsFriend, GetAllFriends, GetFriendRequests } = require("../Controllers/FriendController")

Router.post("/sendrequest", HandleFriendRequest)
Router.post("/checkfriend", CheckIsFriend)
Router.post("/getfriends", GetAllFriends)
Router.post("/getfriendrequest", GetFriendRequests)

module.exports = Router