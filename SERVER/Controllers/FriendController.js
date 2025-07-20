const { MissingData, SuccessResponse, ErrorResponse } = require("../Utils/Response")
const { AddFriend, CheckFriendExists, CancelFriend, AcceptFriendRequest } = require("../Utils/FriendUtil")

exports.HandleFriendRequest = async (req, res) => {
    const { sender, receiver, status, sent_time } = req.body
    if (!sender || !receiver || !status || !sent_time) return MissingData(res)
    try {
        let result
        if (status == 'sent') result = await AddFriend(req.body)
        if (status == 'not') result = await CancelFriend(req.body)
        if (status == 'received') result = await AcceptFriendRequest(req.body)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }

}


exports.CheckIsFriend = async (req, res) => {
    const { sender, receiver } = req.body
    if (!sender || !receiver) return MissingData(res)
    try {
        const result = await CheckFriendExists(req.body)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)

    }
}