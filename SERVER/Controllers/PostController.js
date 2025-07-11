const { CreatePost, ImageUpLoad, GetHomePost } = require("../Utils/PostUtil")
const { MissingData, SuccessResponse, SuccessMultiResponse, ErrorResponse } = require("../Utils/Response")


exports.UploadPost = async (req, res) => {
    const { type, time, userId } = req.body
    if (!type || !time || !userId) MissingData(res)
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
    if (!country) MissingData(res)
    try {
        const result = await GetHomePost(req.body)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}