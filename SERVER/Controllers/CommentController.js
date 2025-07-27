const { MissingData, SuccessResponse, SuccessMultiResponse, ErrorResponse } = require("../Utils/Response")
const { PlaceComment } = require("../Utils/CommentUtil")

exports.AddComment = async (req, res) => {
    const { comenter, time, post_id } = req.body
    if (!comenter || !time || !post_id) return MissingData(res)
    try {
        const result = await PlaceComment(req.body)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}