const express = require("express")
const Router = express.Router()
const { UploadPost, GetHomePosts, GetProfilePosts, GetRecentPost } = require("../Controllers/PostController")

Router.post("/uploadpost", UploadPost)
Router.post("/gethomepost", GetHomePosts)
Router.post("/getuserposts", GetProfilePosts)
Router.post("/getrecentpost", GetRecentPost)

module.exports = Router
