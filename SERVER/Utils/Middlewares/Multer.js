const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'vibe_uploads', // Optional folder name in your Cloudinary media library
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const parser = multer({ storage: storage });

module.exports = parser;
