const cloudinary = require('cloudinary').v2
const {cloudinaryConnect} =require('../config/cloudinary')

exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    await cloudinaryConnect();
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}