const pool = require("../Database/dbConnection")
const { SuccessResponse, ErrorResponse, MissingData } = require("./Response")
const { uploadImage, deleteImage } = require("./Cloudinaryhelper")
const fs = require('fs');


exports.CreatePost = async (body) => {
  try {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO post (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values)
    if (result?.rows.length > 0) {
      const postid = result.rows[0]?.postid
      const RecentPostquery = `SELECT p.*, u.first_name, u.last_name, u.profile_image FROM post as p join "user" as u on p.userid = u.uid WHERE p.postid =$1`
      const recentPostResult = await pool.query(RecentPostquery, [postid])
      return recentPostResult
    }
    else return null
  }
  catch (error) {
    throw error;
  }
}

exports.ImageUpLoad = async (imageFile) => {
  const result = await uploadImage(imageFile.tempFilePath);
  fs.unlink(imageFile.tempFilePath, (err) => {
    if (err) console.error("Temp file not deleted:", err);
  });
  const updateobj = {
    image: result.imageUrl,
    image_public_id: result.publicId
  }
  return updateobj
}



exports.GetHomePost = async (body, res) => {
  try {
    const { city, state, country } = body

    const query = `
  SELECT 
    p.postid,
    p.caption,
    p.image,
    p.post_type,
    p.time,
    p.image_public_id,
    
    json_build_object(
      'uid', u.uid,
      'first_name', u.first_name,
      'last_name', u.last_name,
      'profile_image', u.profile_image
    ) AS userInfo,

    COALESCE(
      json_agg(
       DISTINCT jsonb_build_object(
      'reaction_id', r.reaction_id,
      'user_id', ru.uid,
      'first_name', ru.first_name,
      'last_name', ru.last_name,
      'profile_image', ru.profile_image,
      'time', r.time
    )
      ) FILTER (WHERE r.reaction_id IS NOT NULL),
      '[]'
    ) AS likes,

    COALESCE(
      json_agg(
       DISTINCT jsonb_build_object(
      'comment_id', c.comment_id,
      'postid', p.postid,
      'time', c.time
    )
      ) FILTER (WHERE c.comment_id IS NOT NULL),
      '[]'
    ) AS comments

  FROM post p

  JOIN "user" u ON p.userid = u.uid
  LEFT JOIN reaction r ON r.post_id = p.postid
  LEFT JOIN "user" ru ON r.user_id = ru.uid
  LEFT JOIN comment c ON c.post_id = p.postid
 

  GROUP BY p.postid, u.uid

  ORDER BY p.time DESC;
`;


    const values = [city, state, country];
    const result = await pool.query(query)
    return result

  }
  catch (error) {
    ErrorResponse(res, error)
  }
}


// 'first_name', cu.first_name,
//   'last_name', cu.last_name,
//   'profile_image', cu.profile_image,
//   'time', c.time

//  LEFT JOIN "user"  cu ON cu.uid = c.comenter

exports.GetUserPosts = async (uid, res) => {
  try {
    const query = `SELECT
        p.postid,
        p.caption,
        p.image,
        p.post_type,
        p.time,
        p.image_public_id,

    json_build_object(
      'uid', u.uid,
      'first_name', u.first_name,
      'last_name', u.last_name,
      'profile_image', u.profile_image
    ) AS userInfo,

 COALESCE(
      json_agg(
       DISTINCT jsonb_build_object(
      'reaction_id', r.reaction_id,
      'user_id', ru.uid,
      'first_name', ru.first_name,
      'last_name', ru.last_name,
      'profile_image', ru.profile_image,
      'time', r.time
    )
      ) FILTER (WHERE r.reaction_id IS NOT NULL),
      '[]'
    ) AS likes,

        COALESCE(
      json_agg(
       DISTINCT jsonb_build_object(
      'comment_id', c.comment_id,
      'postid', p.postid
    )
      ) FILTER (WHERE c.comment_id IS NOT NULL),
      '[]'
    ) AS comments

      FROM post p join "user" as u on p.userid = u.uid
      LEFT JOIN reaction r ON r.post_id = p.postid
      LEFT JOIN "user" ru ON r.user_id = ru.uid
       LEFT JOIN comment c ON c.post_id = p.postid
      WHERE userid = $1
      GROUP BY p.postid, p.caption, p.image, p.post_type, p.time, u.uid
    ORDER BY p.time DESC;`

    const result = await pool.query(query, [uid])
    return result
  }
  catch (error) {
    ErrorResponse(res, error)
  }
}

exports.DeletePost = async (image_public_id, postid, res) => {
  try {
    if (image_public_id) await deleteImage(image_public_id)
    const query = `delete from post where postid = $1 RETURNING *`
    const reactionQuery = `delete from reaction where  post_id = $1 RETURNING *`
    const commentQuery = `delete from comment where  post_id = $1 RETURNING *`
    await pool.query(reactionQuery, [postid])
    await pool.query(commentQuery, [postid])
    const result = await pool.query(query, [postid])
    return result
  }
  catch (error) {
    ErrorResponse(res, error)
  }


}