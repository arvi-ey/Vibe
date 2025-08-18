const pool = require("../Database/dbConnection")
const { uploadImage, deleteImage } = require("./Cloudinaryhelper")
const fs = require('fs');


exports.AddStory = async (body) => {
    try {
        const keys = Object.keys(body);
        const values = Object.values(body);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        const query = `INSERT INTO story (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
        const result = await pool.query(query, values)
        if (result?.rows.length > 0) {
            const storyid = result.rows[0]?.storyid
            const RecentStoryquery = `SELECT s.*, u.first_name, u.last_name, u.profile_image FROM story s join "user" u on s.uploader = u.uid WHERE s.storyid =$1`
            const recentStoryResult = await pool.query(RecentStoryquery, [storyid])
            return recentStoryResult
        }
        else return null
    }
    catch (error) {
        throw error;
    }
}



exports.HomeStories = async (uid) => {

    try {
        const query = `SELECT 
             u.uid,
                u.first_name,
                u.last_name,
                u.profile_image,
                COALESCE(
                    json_agg(
                        json_build_object('image', s.image, 'caption', s.caption, 'time', s.time)
                    ) FILTER (WHERE s.storyid IS NOT NULL),
                    '[]'
                ) AS stories
            FROM story s
            JOIN "user" u ON u.uid = s.uploader
            WHERE s.uploader IN (
                SELECT
                    CASE
                        WHEN f.sender = $1 THEN f.receiver
                        WHEN f.receiver = $2 THEN f.sender
                    END
                FROM friends f
                WHERE (f.sender = $3 OR f.receiver = $4) AND status = 'received'
            )
            GROUP BY u.uid, u.first_name, u.last_name, u.profile_image
            ORDER BY MAX(s.time) DESC
        `

        const result = await pool.query(query, [uid, uid, uid, uid])
        // const result = await pool.query(query)
        return result
    }
    catch (error) {
        throw error
    }
}

exports.UserStories = async (uid) => {
    try {
        const query = `SELECT 
        u.first_name,
        u.last_name,
        u.profile_image,
        u.uid,
         COALESCE(
                json_agg(
                json_build_object('image', s.image, 'caption', s.caption, 'time', s.time)
                ) FILTER (WHERE s.storyid IS NOT NULL),
                '[]'
            ) AS stories
             from story s inner join "user" u on u.uid = s.uploader
        where uploader = $1 
        GROUP BY u.first_name, u.last_name, u.profile_image, u.uid;`
        const result = await pool.query(query, [uid])
        return result
    }
    catch (error) {
        throw error
    }
}