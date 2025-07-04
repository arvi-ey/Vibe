const pool = require("../Database/dbConnection")
const { MissingData, SuccessResponse } = require("../Utils/Response")
const { CheckUserExists, Hashedpassword, CheckPassword } = require("../Utils/UserUtil")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.CreateUser = async (req, res) => {
    try {
        const body = req.body;
        const userExists = await CheckUserExists(req, res)
        if (userExists.length > 0) return res.status(400).json({
            message: "The provided email or mobile number is already associated with an existing account."
        })
        else {
            const keys = Object.keys(body);
            const HashedPassword = await Hashedpassword(body.password)
            if (HashedPassword) body.password = HashedPassword
            else return res.status(400).json({ message: "Something went wrong" })
            const values = Object.values(body);
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
            const query = `INSERT INTO "user" (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
            const result = await pool.query(query, values)
            SuccessResponse(req, res, result)
        }
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}




exports.UserSignIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) MissingData(req, res)
    const user = await CheckUserExists(req, res)
    if (user?.length < 1) return res.status(400).json({
        message: "The provided email address is not linked to any existing account."
    })
    const validPassword = await CheckPassword(user[0].password, password)
    if (!validPassword) res.send("FALSE")
    else res.send(true)

}