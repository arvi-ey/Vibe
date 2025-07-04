const { MissingData, SuccessResponse, ErrorResponse } = require("../Utils/Response")
const { CheckUserExists, Hashedpassword, CheckPassword, RegisterUser, UserLogIn } = require("../Utils/UserUtil")

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
        if (!email || !password) MissingData(req, res)
        const user = await CheckUserExists(req, res)
        if (user?.length < 1) return res.status(400).json({
            message: "The provided email address is not linked to any existing account."
        })
        const validPassword = await CheckPassword(user[0].password, password)
        if (!validPassword) return res.status(400).json({ message: "Invalid password", statusCode: 400, })
        const sessiondata = await UserLogIn(user[0], res)
        if (sessiondata) {
            return res.status(200).json({
                message: "You have successfully logged in.",
                data: user[0],
                sessiondata,
                statusCode: 200
            })
        }
        else {
            return res.status(200).json({
                message: "Something went wrong",
                data: null,
                sessiondata: null,
                statusCode: 500
            })

        }
    }
    catch (error) {
        ErrorResponse(res, error)
    }
}