const cloudinary = require('cloudinary').v2;
const env = require('dotenv');
const fs = require('fs');

env.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

exports.uploadSingleImage = async (path) => {
  if (!path) return null;

  try {
    const response = await cloudinary.uploader.upload(path, { resource_type: 'auto' });
    if (fs.existsSync(path)) fs.unlinkSync(path);  
    return response;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    if (fs.existsSync(path)) fs.unlinkSync(path);
    return null; 
  }
};

exports.uploadMultipleImages = async (paths) => {
  if (!paths || !Array.isArray(paths)) return null;

  try {
    const uploadedImages = paths.map(async (path) => {
      try {
        const response = await cloudinary.uploader.upload(path, { resource_type: 'auto' });
        if (fs.existsSync(path)) fs.unlinkSync(path);
        return response;
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        if (fs.existsSync(path)) fs.unlinkSync(path);
        return null; 
      }
    });

    const responses = await Promise.all(uploadedImages);
    return responses.filter(Boolean); 
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    return null;
  }
};
