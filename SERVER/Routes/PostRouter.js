const express = require("express")
const Router = express.Router()
const { UploadPost, GetHomePosts, GetProfilePosts, DeleteUserPost, GetpostReactions } = require("../Controllers/PostController")

Router.post("/uploadpost", UploadPost)
Router.post("/gethomepost", GetHomePosts)
Router.post("/getuserposts", GetProfilePosts)
Router.post("/getpostreactions", GetpostReactions)
Router.delete("/deleteuserpost", DeleteUserPost)

module.exports = Router
