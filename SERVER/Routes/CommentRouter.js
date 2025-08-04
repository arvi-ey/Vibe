const express = require("express")
const Router = express.Router()
const { AddComment, GetComments, DeleteComment } = require("../Controllers/CommentController")
Router.post('/addcomment', AddComment)
Router.post('/getposcomments', GetComments)
Router.post('/deletecomment', DeleteComment)

module.exports = Router