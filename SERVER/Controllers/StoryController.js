const { CreatePost, ImageUpLoad, GetHomePost, GetUserPosts, DeletePost } = require("../Utils/PostUtil")
const { MissingData, SuccessResponse, SuccessMultiResponse, ErrorResponse } = require("../Utils/Response")
const { GetFriends } = require("../Utils/FriendUtil")
const { AddStory, HomeStories, UserStories } = require("../Utils/StoryUtil")

exports.UploadStory = async (req, res) => {
    const { time, uploader } = req.body
    if (!time || !uploader) return MissingData(res)
    try {
        let update_obj = req.body
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            const imageObj = await ImageUpLoad(imageFile)
            update_obj = { ...req.body, ...imageObj }
        }
        const result = await AddStory(update_obj)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}


exports.GetHomeStories = async (req, res) => {
    const { uid } = req.body
    if (!uid) return MissingData(res)
    try {
        const result = await HomeStories(uid)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}


exports.GetUserStories = async (req, res) => {
    const { uid } = req.body
    if (!uid) return MissingData(res)
    try {
        const result = await UserStories(uid)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}