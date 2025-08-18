const cloudinary = require("./CloudinaryConfig");

const uploadImage = async (imagePath) => {
    const options = {
        use_filename: false,
        unique_filename: true,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        return {
            publicId: result.public_id,
            imageUrl: result.secure_url
        }
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};


const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Image deletion failed:", error);
        throw error;
    }
};

module.exports = { uploadImage, deleteImage };
