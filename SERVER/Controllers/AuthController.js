const { MissingData, SuccessResponse, ErrorResponse } = require("../Utils/Response")
const { CheckUserExists, Hashedpassword, CheckPassword, RegisterUser, LogIn, Logout, VerifyAuthentication } = require("../Utils/UserUtil")

exports.CreateUser = async (req, res) => {
    try {
        const body = req.body;
        const userExists = await CheckUserExists(req, res)
        if (userExists.length > 0) return res.status(400).json({
            message: "The provided email or mobile number is already associated with an existing account."
        })
        else {
            const HashedPassword = await Hashedpassword(body.password)
            if (HashedPassword) body.password = HashedPassword
            const result = await RegisterUser(body)
            SuccessResponse(res, result)
        }
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}



exports.UserSignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) MissingData(res)
        const user = await CheckUserExists(req, res)
        if (user?.length < 1) return res.status(200).json({
            message: "The provided email address is not linked to any existing account.",
            statusCode: 400
        })
        const validPassword = await CheckPassword(user[0].password, password)
        if (!validPassword) return res.status(200).json({ message: "Invalid password", statusCode: 400, })
        await LogIn(user[0], res)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}


exports.UserSignOut = async (req, res) => {
    try {
        await Logout(res)
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}


exports.CheckAuth = async (req, res) => {
    await VerifyAuthentication(req, res)
}