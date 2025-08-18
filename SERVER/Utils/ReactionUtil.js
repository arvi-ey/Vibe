const pool = require("../Database/dbConnection")

exports.SetReaction = async (obj) => {
    try {
        const values = Object.values(obj)
        const keys = Object.keys(obj)
        const setClause = keys.map((_, i) => `$${i + 1}`).join(", ");
        const query = `INSERT INTO reaction(${keys.join(", ")}) VALUES (${setClause}) RETURNING *`;
        let result = await pool.query(query, values)
        const userDetailsQuery = `SELECT first_name , last_name , profile_image FROM "user" WHERE uid=$1;`
        const userDetails = await pool.query(userDetailsQuery, [obj.user_id])
        const userObj = userDetails.rows[0]
        result.rows[0] = {
            ...result.rows[0],
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            profile_image: userObj.profile_image
        };
        return result
    }
    catch (error) {
        throw error
    }
}
exports.RemoveReaction = async (post_id, user_id) => {
    try {
        const query = `DELETE FROM reaction WHERE (post_id = $1 AND user_id = $2) RETURNING *`;
        let result = await pool.query(query, [post_id, user_id])
        const userDetailsQuery = `SELECT first_name , last_name , profile_image FROM "user" WHERE uid=$1;`
        const userDetails = await pool.query(userDetailsQuery, [user_id])
        const userObj = userDetails.rows[0]
        result.rows[0] = {
            ...result.rows[0],
            first_name: userObj.first_name,
            last_name: userObj.last_name,
            profile_image: userObj.profile_image
        };
        return result
    }
    catch (error) {
        throw error
    }
}


exports.GetReactionsById = async (postid) => {
    try {
        const query = `SELECT r.*,u.first_name , u.last_name , u.profile_image , u.uid  FROM reaction r INNER JOIN "user" u ON u.uid =r.user_id  WHERE post_id = $1`
        const result = await pool.query(query, [postid])
        return result
    }
    catch (error) {
        throw error
    }

}