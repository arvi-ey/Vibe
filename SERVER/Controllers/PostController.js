const { CreatePost, ImageUpLoad } = require("../Utils/PostUtil")
const { MissingData, SuccessResponse, ErrorResponse } = require("../Utils/Response")


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

    }
}