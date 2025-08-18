const pool = require("../Database/dbConnection")


exports.PlaceComment = async (obj) => {
    try {
        const values = Object.values(obj)
        const keys = Object.keys(obj)
        const placeholders = keys.map((_, index) => `$${index + 1}`).join(", ")
        const query = `INSERT INTO comment(${keys.join(", ")}) VALUES (${placeholders}) RETURNING *;`
        const result = await pool.query(query, values)
        return result
    }
    catch (error) {
        throw error
    }
}

exports.GetCommentByPostId = async (postid) => {
    try {
        const query = `SELECT c.*,u.first_name , u.last_name , u.profile_image FROM comment c INNER JOIN "user" u on u.uid = c.comenter  WHERE post_id = $1 
        ORDER BY c.time desc
        ;`
        const result = await pool.query(query, [postid])
        return result

    }
    catch (error) {
        throw error
    }
}

exports.DeleteCommentById = async (comment_id) => {
    try {
        const query = `Delete from comment where comment_id=$1 RETURNING *;`
        const result = await pool.query(query, [comment_id])
        return result
    }
    catch (error) {
        throw error
    }
}