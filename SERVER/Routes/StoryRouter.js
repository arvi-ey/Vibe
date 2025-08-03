const express = require('express')
const Router = express.Router()
const { UploadStory, GetHomeStories, GetUserStories } = require("../Controllers/StoryController")
Router.post("/uploadstory", UploadStory)
Router.post("/gethomestories", GetHomeStories)
Router.post("/getuserstories", GetUserStories)

module.exports = Router