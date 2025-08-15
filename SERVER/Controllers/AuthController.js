const { MissingData, SuccessResponse, ErrorResponse } = require("../Utils/Response")
const { VerifyUserEmail, CheckUserExists, Hashedpassword, CheckPassword, RegisterUser, LogIn, Logout, VerifyAuthentication, GetUserByID, CheckEmailExists, SendEmail, CreateTestUser } = require("../Utils/UserUtil")







exports.RequestEmailVerification = async (req, res) => {
    const { email } = req.body
    try {
        const userExists = await CheckEmailExists(email)
        const userData = userExists[0]
        if (userData && userData.verified == true) return res.status(200).json({
            message: "The provided email is already associated with an existing account.",
            statusCode: 400
        })
        else {
            const isExists = userData?.email ? true : false
            const sentEmailInfo = await SendEmail(email, isExists)
            return res.status(200).json({
                message: "Email sent successfully",
                info: sentEmailInfo.info.response,
                email: sentEmailInfo.insertObj.email,
                uid: sentEmailInfo.insertObj.uid,
                data: sentEmailInfo.insertObj,
                statusCode: 200
            });
        }

    }
    catch (error) {
    }

}


exports.CreateUser = async (req, res) => {
    try {
        const body = req.body;
        const HashedPassword = await Hashedpassword(body.password)
        if (HashedPassword) body.password = HashedPassword
        const result = await RegisterUser(body)
        console.log(result)
        SuccessResponse(res, result)
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during registration' });

    }
}



exports.Createtestuser = async (req, res) => {
    try {
        const result = await CreateTestUser(req.body)
        SuccessResponse(res, result)
    }
    catch (err) {
        ErrorResponse(res, err)

    }

}

exports.VerifyEmail = async (req, res) => {
    const { uid, code } = req.body
    if (!uid || !code) return MissingData(res)
    try {
        const result = await VerifyUserEmail(uid, code)
        res.status(200).json(result)
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
        const userData = user[0]
        if (!userData.password && userData.verified) {
            return res.status(400).json({
                message: "Please re-verify your email to complete account setup."
            })
        }
        if (!userData.verified) {
            return res.status(400).json({
                message: "Email is not verified"
            })
        }
        const validPassword = await CheckPassword(userData.password, password)
        if (!validPassword) return res.status(200).json({ message: "Invalid password", statusCode: 400, })
        if (userData.verified) {
            await LogIn(user[0], res)
        }
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
    try {
        const user = await VerifyAuthentication(req, res)
        if (user && user.uid) {
            const result = await GetUserByID(user.uid)
            SuccessResponse(res, result)
        }
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}