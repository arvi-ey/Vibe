const express = require("express")
const Router = express.Router()
const { UploadPost, GetHomePosts, GetProfilePosts, } = require("../Controllers/PostController")

Router.post("/uploadpost", UploadPost)
Router.post("/gethomepost", GetHomePosts)
Router.post("/getuserposts", GetProfilePosts)

module.exports = Router
