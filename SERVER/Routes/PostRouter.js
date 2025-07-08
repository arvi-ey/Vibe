const express = require("express")
const Router = express.Router()
const { UploadPost } = require("../Controllers/PostController")

Router.post("/uploadpost", UploadPost)

module.exports = Router
