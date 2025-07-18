const { CreatePost, ImageUpLoad, GetHomePost, GetUserPosts, DeletePost } = require("../Utils/PostUtil")
const { MissingData, SuccessResponse, SuccessMultiResponse, ErrorResponse } = require("../Utils/Response")


exports.UploadPost = async (req, res) => {
    const { time, userid, post_type } = req.body
    if (!time || !userid || !post_type) return MissingData(res)
    try {
        let update_obj = req.body
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            const imageObj = await ImageUpLoad(imageFile)
            update_obj = { ...req.body, ...imageObj }
        }
        const result = await CreatePost(update_obj)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}



exports.GetHomePosts = async (req, res) => {
    const { country } = req.body
    if (!country) return MissingData(res)
    try {
        const result = await GetHomePost(req.body, res)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}


exports.GetProfilePosts = async (req, res) => {
    const { uid } = req.body

    if (!uid) return MissingData(res)
    try {
        const result = await GetUserPosts(uid, res)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}


exports.DeleteUserPost = async (req, res) => {
    const { postid, image_public_id } = req.body
    if (!postid) return MissingData(res)
    try {
        const result = await DeletePost(image_public_id, postid, res)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }

}