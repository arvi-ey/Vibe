const pool = require("../Database/dbConnection")
const { SuccessResponse, ErrorResponse } = require("./Response")
const fs = require('fs');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

const { deleteImage, uploadImage } = require("./Cloudinaryhelper")

exports.CheckUserExists = async (req, res) => {
    const { email, mobile } = req.body
    try {
        const query = `SELECT * FROM "user" WHERE email = $1 OR  mobile = $2`;
        const response = await pool.query(query, [email, mobile])
        return response.rows;

    }
    catch (error) {

    }
}
exports.CheckEmailExists = async (email) => {
    try {
        const query = `SELECT * FROM "user" WHERE email = $1`;
        const response = await pool.query(query, [email])
        return response.rows;

    }
    catch (error) {
        throw error
    }
}

exports.Hashedpassword = async (password) => {
    try {

        const salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(password, salt)
        return hassedPassword
    }
    catch (error) {
        return null
    }
}

exports.CheckPassword = async (password, enteredPassword) => {
    try {
        const checkPassword = await bcrypt.compare(enteredPassword, password)
        return checkPassword
        // Rohit@1234

    }
    catch {
        return null
    }

}



exports.RegisterUser = async (body) => {
    try {
        const values = [body.first_name, body.last_name, body.password, body.gender, body.country, body.uid]
        const query = `UPDATE "user" set first_name=$1 ,last_name=$2 , password=$3 , gender=$4 ,country=$5 where uid = $6 RETURNING *`;
        const result = await pool.query(query, values)
        return result
    }
    catch (err) {
        throw err
    }
}


exports.LogIn = async (user, res) => {
    try {
        const sessiondata = jwt.sign({
            uid: user.uid,
            email: user.email,
            phone: user.phone,
        }, process.env.JWT_SECRET)

        res.cookie('Accesstoken', sessiondata, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        if (sessiondata) {
            return res.status(200).json({
                message: "You have successfully logged in.",
                data: user,
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
        ErrorResponse(error)
    }

}


exports.Logout = async (res) => {
    try {
        res.clearCookie("Accesstoken", {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
        });

        res.status(200).json({
            message: "User logged out successfully",
            success: true,
            statuCode: 200
        });
    } catch (error) {
        res.status(500).json({
            message: "Logout failed",
            error: error.message,
            success: false,
            statuCode: 200
        });
    }
}



exports.GetUserByID = async (uid) => {
    try {
        const query = `SELECT * FROM "user" WHERE uid = $1`;
        const result = await pool.query(query, [uid])
        if (result?.rows.length > 0) return result
        else return null
    }
    catch (error) {
        throw error
    }
}


exports.UpDateUserById = async (body, uid) => {
    try {

        const keys = Object.keys(body)
        const values = Object.values(body)
        values.push(uid)
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
        const query = `UPDATE "user" SET ${setClause} WHERE uid = $${keys.length + 1} RETURNING *`;
        const result = await pool.query(query, values)
        return result
    }
    catch (error) {

    }
}


exports.VerifyAuthentication = async (req, res) => {
    const token = req.cookies.Accesstoken
    if (!token) {
        return res.status(200).json({ message: 'unauthorized', });
    }


    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });
        return decoded;
    } catch (err) {
        res.status(403).json({ message: 'Invalid token', statusCode: 403 });
        return null;
    }

}



exports.ImageUpLoad = async (imageFile, post_type) => {

    const result = await uploadImage(imageFile.tempFilePath);
    fs.unlink(imageFile.tempFilePath, (err) => {
        if (err) console.error("Temp file not deleted:", err);
    });
    let updateobj
    if (post_type == "cover_photo") {
        updateobj = {
            cover_photo: result.imageUrl,
            cover_public_id: result.publicId
        }
    }
    else if (post_type == "profile_image") {
        updateobj = {
            profile_image: result.imageUrl,
            image_public_id: result.publicId
        }
    }
    return updateobj
}


exports.GetProfileInfo = async (uid) => {
    try {
        const query = `SELECT * FROM "user" WHERE uid= $1`
        const result = await pool.query(query, [uid])
        return result
    }
    catch (error) {
        return null
    }
}




const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Vibe" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        return info;
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
};


exports.VerifyUserEmail = async (uid, code) => {
    try {
        const query = `Select uid from "user" where (uid = $1 AND verificationcode = $2) LIMIT 1`
        const result = await pool.query(query, [uid, code])
        let returnobj
        if (result.rows.length == 0) {
            returnobj = {
                verified: false,
                message: "Please check the code and try again.",
                statusCode: 401
            }
        }
        else if (result.rows[0].uid) {
            const query = `update "user" set verified = true, verificationcode=null where uid = $1 returning *;`
            const result = await pool.query(query, [uid])
            if (result.rows.length == 0) {
                returnobj = {
                    verified: true,
                    message: "Something went wrong",
                    statusCode: 401
                }
            }
            else if (result.rows[0].uid) {
                returnobj = {
                    verified: true,
                    message: "Email verification completed successfully",
                    statusCode: 200
                }
            }
        }
        return returnobj

    }
    catch (error) {
        throw error
    }

}





exports.SendEmail = async (email, isExists) => {
    try {
        let verificationcode = Math.floor(100000 + Math.random() * 900000);
        const info = await sendEmail({
            to: email,
            subject: `Email verification code: ${verificationcode}`,
            html: `
            <!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml">

            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Email Verification</title>
                    <style>
                     body {
            font-family: Arial, sans-serif;
                         background-color: #f4f4f4;
                         margin: 0;
                         padding: 0;
                        }

                        .container {
                            max-width: 600px;
                            margin-top: 20px;
                            background-color: #ffffff;
                            padding: 30px;
                          border-radius: 8px;
                          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                        }

                        .header {
                         padding-bottom: 20px;
                         border-bottom: 1px solid #dddddd;
                        }

                        .header h1 {
                         margin: 0;
                            color: #333333;
                            font-size: 24px;
                        }

                        .content {
                         padding: 20px 0;
                            color: #555555;
                            font-size: 16px;
                        }

                        .code-box {
                            background-color: #f0f0f0;
                            border-radius: 6px;
                            padding: 15px;
                         margin: 20px auto;
                         display: inline-block;
                         font-size: 24px;
                         font-weight: bold;
                            letter-spacing: 2px;
                            color: #222;
                     }

                        .footer {
                         text-align: center;
                         font-size: 12px;
                         color: #999999;
                            padding-top: 20px;
                            border-top: 1px solid #eeeeee;
                        }

                        @media (prefers-color-scheme: dark) {
                            body {
                background-color: #1a1a1a;
                            }

                            .container {
                             background-color: #2a2a2a;
                color: #dddddd;
                            }

                            .code-box {
                                background-color: #3a3a3a;
                             color: #ffffff;
                            }
                        }
                </style>
            </head>

            <body>
                <div class="container">
                    <div class="header">
                     <h1>Vibe</h1>
                    </div>
                    <div class="content">
                     <p>Hi there,</p>
                        <p>Please use the verification code below to verify your email address:</p>
                        <div class="code-box">${verificationcode}</div>
                     <p>This code is valid for the next 10 minutes. If you did not initiate this request, you can safely ignore
                         this email.</p>
                    </div>
                    <div class="footer">
                     &copy; ${new Date().getFullYear()} Vibe. All rights reserved.
                    </div>
             </div>
            </body>
            </html>
            `,
        });
        let query
        let result
        if (!isExists) {
            query = `INSERT into "user" (email,verificationcode,verified) values ($1,$2,$3) RETURNING email , uid;`
            const values = [email, verificationcode, false]
            result = await pool.query(query, values)

        }
        else {
            query = `Update "user" set verificationcode = $1 returning email , uid`
            result = await pool.query(query, [verificationcode])
        }
        const insertObj = result.rows[0]
        return { insertObj, info }

    } catch (error) {
        throw error
    }
}


exports.GetSuggestedUSer = async (uid) => {
    try {
        const query = `SELECT first_name, last_name , profile_image, uid
    FROM "user" u
    WHERE u.uid != $1
        AND u.uid NOT IN (
            SELECT f.sender
            FROM friends f
            WHERE f.receiver =$2
            UNION
            SELECT f.receiver
            FROM friends f
            WHERE f.sender = $3
        )
        LIMIT 5;`
        const result = await pool.query(query, [uid, uid, uid])
        return result
    }
    catch (error) {

    }

}


exports.CreateTestUser = async (body) => {
    try {
        const keys = Object.keys(body)
        const values = Object.values(body)
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ")
        const query = `INSERT INTO "user" (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
        const result = await pool.query(query, values)
        return result
    }
    catch (error) {
        throw error
    }
    // strongPassword123

}


exports.SearchUserByletter = async (text) => {
    try {
        const startsWith = `^${text}`;
        const anywhere = `${text}`;

        const placeholders = [startsWith, anywhere, anywhere];

        const query = `
            SELECT name, profile_image, uid
            FROM (
                SELECT 
                    CONCAT(first_name, ' ', last_name) AS name,
                    profile_image,
                    uid,
                    CASE
                        WHEN first_name ~* $1 THEN 1
                        WHEN first_name ~* $2 THEN 2
                        WHEN last_name ~* $3 THEN 3
                        ELSE 4
                    END AS priority
                FROM "user"
                WHERE first_name ~* $1 OR first_name ~* $2 OR last_name ~* $3
            ) AS sub
            ORDER BY priority;
        `;

        const result = await pool.query(query, placeholders);
        return result;

    }
    catch (error) {
        throw error
    }
}