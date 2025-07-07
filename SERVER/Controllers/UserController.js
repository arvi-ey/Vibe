const { MissingData, SuccessResponse, ErrorResponse } = require("../Utils/Response")
const { GetUserByID, UpDateUserById, ImageUpLoad } = require("../Utils/UserUtil")

exports.GetUser = async (req, res) => {
    const params = req.params
    if (!params?.uid) MissingData(res)
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
    if (!uid) MissingData(res)
    try {
        const result = await UpDateUserById(req.body, uid)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }

}


exports.UploadImage = async (req, res) => {
    const { uid } = req.params
    if (!uid) MissingData(res)
    if (!req.files || !req.files.image) MissingData(res)
    try {
        const imageFile = req.files.image;
        const userData = await GetUserByID(uid)
        const imageObj = await ImageUpLoad(userData, imageFile)
        const result = await UpDateUserById(imageObj, uid)
        SuccessResponse(res, result)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}