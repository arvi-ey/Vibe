const { MissingData, SuccessResponse, ErrorResponse, SuccessMultiResponse } = require("../Utils/Response")
const { AddFriend, CheckFriendExists, CancelFriend, AcceptFriendRequest, GetFriends, GetRequests } = require("../Utils/FriendUtil")

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
exports.GetAllFriends = async (req, res) => {
    const { uid } = req.body
    if (!uid) return MissingData(res)
    try {
        const result = await GetFriends(uid)
        SuccessMultiResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res.error)
    }
}

exports.GetFriendRequests = async (req, res) => {
    const { uid, type } = req.body
    if (!uid || !type) return MissingData(res)
    try {
        const result = await GetRequests(req.body)
        SuccessMultiResponse(res, result)
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