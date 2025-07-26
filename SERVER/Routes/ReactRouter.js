const express = require('express')
const Router = express.Router()
const { HandleReaction } = require('../Controllers/ReactionController')


Router.post('/setreaction', HandleReaction)

module.exports = Router