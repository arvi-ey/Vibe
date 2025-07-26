const { SetReaction, RemoveReaction } = require("../Utils/ReactionUtil")
const { MissingData, SuccessResponse, SuccessMultiResponse, ErrorResponse } = require("../Utils/Response")


exports.HandleReaction = async (req, res) => {
    const { post_id, user_id, time, type, } = req.body
    if (!post_id || !user_id || !time || !type) return MissingData(res)
    try {
        let result
        if (type == 'set') result = await SetReaction({ post_id, user_id, time })
        else if (type == 'remove') result = await RemoveReaction(post_id, user_id)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}