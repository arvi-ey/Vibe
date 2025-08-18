const pool = require("../Database/dbConnection")
const { ErrorResponse } = require("./Response")

exports.AddFriend = async (body) => {
    try {
        const keys = Object.keys(body)
        const values = Object.values(body)
        const setClause = keys.map((_, i) => `$${i + 1}`).join(", ");
        const query = `INSERT INTO friends (${keys.join(", ")}) VALUES (${setClause}) RETURNING *`;
        const result = await pool.query(query, values)
        return result
    }
    catch (error) {
        throw error
    }
}

exports.CancelFriend = async (body) => {
    try {
        const value = [body.id]
        const query = `DELETE FROM friends WHERE id = $1 RETURNING *`;
        let result = await pool.query(query, value)
        result.rows[0].status = 'not'
        return result

    }
    catch (error) {
        throw error
    }
}

exports.AcceptFriendRequest = async (body) => {
    try {
        const values = [body.status, body.id]
        const query = `UPDATE friends SET status=$1 WHERE id=$2 RETURNING *`;
        const result = await pool.query(query, values)
        if (result?.rows[0]?.status == 'received') {
            const userValue = [body.sender]
            const Userquery = `SELECT f.*, u.first_name , u.last_name , u.profile_image FROM friends f INNER JOIN "user" u on f.sender = u.uid
            WHERE f.sender = $1;`
            const result = await pool.query(Userquery, userValue)
            return result
        }

    }
    catch (error) {
        throw error
    }
}


exports.CheckFriendExists = async (body) => {
    try {
        const values = [body.sender, body.receiver, body.receiver, body.sender]
        const query = `select * from friends where (sender = $1 AND receiver = $2) OR (sender = $3 AND receiver = $4);`
        const result = await pool.query(query, values)
        return result
    }

    catch (error) {
        throw error
    }

}

exports.GetRequests = async (body) => {
    try {
        const limit = body.limit || "ALL"
        const check = body?.type == 'sender' ? 'receiver' : 'sender'
        const query = `SELECT f.*, u.first_name , u.last_name , u.uid , u.profile_image FROM friends f 
        INNER JOIN "user" u
         ON
         CASE
            WHEN f.${body?.type} = $1 THEN f.${check} = u.uid 
            ELSE null
            END
         WHERE f.${body.type} = $2 AND f.status='sent'
         limit ${limit}
         ;`

        const result = await pool.query(query, [body.uid, body.uid])
        return result
    }
    catch (error) {
        throw error
    }
}

exports.GetFriends = async (uid) => {
    try {
        const values = [uid, uid, uid, uid]
        const query = `SELECT f.* , u. first_name , u.last_name , u.uid , u.profile_image  FROM friends f INNER JOIN "user" u ON
	CASE
		WHEN f.sender =$1 THEN f.receiver = u.uid
		WHEN f.receiver =$2 THEN f.sender = u.uid
		ELSE null
		END
        WHERE  (f.sender = $3 OR 
        f.receiver = $4) AND f.status='received'
	    ORDER BY f.sent_time DESC;`

        const result = await pool.query(query, values)
        return result
    }
    catch (error) {
        throw error
    }
}