const pool = require("../Database/dbConnection")

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
        if (result?.rows?.[0]) {
            res.status(200).json({
                message: "User get successfully",
                statusCode: 200,
                data: result.rows[0]
            })
        }
        else {
            res.status(200).json({
                message: "Something went wrong",
                statusCode: 200,
                data: null
            })

        }

    }
    catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: error
        }
        )
    }

}