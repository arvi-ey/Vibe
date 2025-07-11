const express = require("express")
const Router = express.Router()
const { UploadPost, GetHomePosts } = require("../Controllers/PostController")

Router.post("/uploadpost", UploadPost)
Router.post("/gethomepost", GetHomePosts)

module.exports = Router
