const { MissingData, SuccessResponse, ErrorResponse, SuccessMultiResponse } = require("../Utils/Response")
const { GetUserByID, UpDateUserById, ImageUpLoad, GetProfileInfo, GetSuggestedUSer, SearchUserByletter } = require("../Utils/UserUtil")
const { CreatePost } = require("../Utils/PostUtil")
const { data } = require("react-router")
exports.GetUser = async (req, res) => {
    const params = req.params
    if (!params?.uid) return MissingData(res)
    try {
        const result = await GetUserByID(params.uid)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}

exports.UpdateUser = async (req, res) => {

    const uid = req.params.uid
    if (!uid) return MissingData(res)
    try {
        const result = await UpDateUserById(req.body, uid)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }

}


exports.UploadImage = async (req, res) => {
    const { post_type, time, userid, } = req.body
    if (!post_type || !time || !userid) return MissingData(res)
    try {
        const imageFile = req.files.image;
        const imageObj = await ImageUpLoad(imageFile, post_type)
        const result = await UpDateUserById(imageObj, userid)
        const newObj = {
            image: post_type == "profile_image" ? imageObj?.profile_image : imageObj?.cover_photo,
            image_public_id: post_type == "profile_image" ? imageObj?.image_public_id : imageObj?.cover_public_id
        }
        const updateobj = { ...req.body, ...newObj }
        const potresult = await CreatePost(updateobj)
        SuccessResponse(res, potresult)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}

exports.GetProfiledata = async (req, res) => {
    const { uid } = req.params
    if (!uid) return MissingData(res)
    try {
        const result = await GetProfileInfo(uid)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }

}


exports.UploadUserPhoto = async (req, res) => {
    const { uid, post_type } = req.body
    if (!uid || !post_type || !req.files || !req.files.image) return MissingData(res)
    let update_obj = req.body
    const imageFile = req.files.image;
    const imageObj = await ImageUpLoad(imageFile)
    update_obj = { ...req.body, ...imageObj }
    // const result 
}



exports.GetSuggesteduser = async (req, res) => {
    const { uid } = req.body
    try {
        const result = await GetSuggestedUSer(uid)
        SuccessMultiResponse(res, result)

    }
    catch (error) {
        ErrorResponse(res, error)
    }
}


exports.SearchUser = async (req, res) => {
    try {
        const { text } = req.body
        if (!text || text.trim().length === 0) {
            return res.status(200).json({
                message: "Search text cannot be empty",
                data: [],
                statusCode: 400
            });
        }
        const result = await SearchUserByletter(text)
        if (result?.rows?.length > 0) {
            return res.status(200).json({
                message: "User searched",
                data: result.rows,
                statusCode: 200,
            })
        }
        else if (result?.rows?.length == 0) {
            return res.status(200).json({
                message: "No data available",
                data: result.rows,
                statusCode: 200,
            })
        }
        else return res.status(200).json({
            data: result.rows,
            message: "No user found"
        })
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}