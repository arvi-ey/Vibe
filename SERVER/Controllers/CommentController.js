const { MissingData, SuccessResponse, SuccessMultiResponse, ErrorResponse } = require("../Utils/Response")
const { PlaceComment, GetCommentByPostId } = require("../Utils/CommentUtil")

exports.AddComment = async (req, res) => {
    const { comenter, time, post_id, comment_text } = req.body
    if (!comenter || !time || !post_id || !comment_text) return MissingData(res)
    try {
        const result = await PlaceComment(req.body)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}
exports.GetComments = async (req, res) => {
    const { postid } = req.body
    if (!postid) return MissingData(res)
    try {
        const result = await GetCommentByPostId(postid)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}