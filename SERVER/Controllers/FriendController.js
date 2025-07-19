const { MissingData, SuccessResponse, ErrorResponse } = require("../Utils/Response")
const { AddFriend } = require("../Utils/FriendUtil")

exports.SendFriendRequest = async (req, res) => {
    const { sender, receiver, status, sent_time } = req.body
    if (!sender || !receiver || !status || !sent_time) return MissingData(res)
    try {
        const result = await AddFriend(req.body)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }

}