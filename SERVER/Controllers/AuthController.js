const pool = require("../Database/dbConnection")

exports.CreateUser = async (req, res) => {
    try {
        const body = req.body;
        const keys = Object.keys(body);
        console.log(keys, "KEYSS")
        const values = Object.values(body);
        console.log(values, "VALUES")
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        const query = `INSERT INTO "user" (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
        const result = await pool.query(query, values)
        if (result?.rows?.[0]) {
            res.status(200).json({
                message: "User created Successfully",
                data: result.rows[0],
                statusCode: 200
            })
        }
        else {
            res.status(200).json({
                message: "Something went wrong",
                data: null,
                statusCode: 200
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}