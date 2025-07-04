const pool = require("../Database/dbConnection")
const { MissingData, SuccessResponse } = require("../Utils/Response")

exports.GetUser = async (req, res) => {
    const params = req.params
    console.log(params?.uid)
    if (!params?.uid) return res.status(400).json({
        message: "Missing uid",
        statusCode: 400
    })
    try {
        const query = `SELECT * FROM "user" WHERE uid = $1`;
        const result = await pool.query(query, [params.uid])
        SuccessResponse(req, res, result)
    }
    catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error
        }
        )
    }

}