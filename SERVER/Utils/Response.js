exports.MissingData = (res) => {
    return res.status(400).json({ statusCode: 400, message: "Missing Data" })
}

exports.SuccessResponse = (res, result, message = "Successful") => {
    if (result?.rows?.length > 0) {
        return res.status(200).json({
            message,
            data: result.rows[0],
            statusCode: 200,
        })
    }
    else if (result?.rows?.length == 0) {
        return res.status(200).json({
            message: "No data available",
            data: result.rows,
            statusCode: 201,
        })
    }
    else {
        return res.status(500).json({
            message: "Something went wrong",
            data: null,
            statusCode: 500
        })
    }
}
exports.SuccessMultiResponse = (res, result, message = "Successful") => {
    if (result?.rows?.length > 0) {
        return res.status(200).json({
            message,
            data: result.rows,
            statusCode: 200,
        })
    }
    else if (result?.rows?.length == 0) {
        return res.status(200).json({
            message: "No data available",
            data: result.rows,
            statusCode: 200,
        })
    }
    else {
        return res.status(500).json({
            message: "Something went wrong",
            data: null,
            statusCode: 200
        })
    }
}

exports.ErrorResponse = async (res, error) => {
    return res.status(400).json({
        message: error.message
    })
}