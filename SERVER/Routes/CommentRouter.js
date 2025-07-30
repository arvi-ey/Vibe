const express = require("express")
const Router = express.Router()
const { AddComment, GetComments } = require("../Controllers/CommentController")
Router.post('/addcomment', AddComment)
Router.post('/getposcomments', GetComments)

module.exports = Router