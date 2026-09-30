const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'devq3zfrq',
  api_key: process.env.CLOUDINARY_API_KEY || '469972622734135',
  api_secret: process.env.CLOUDINARY_API_SECRET || '71LmRN1RuZt9IUpxKOk27iYojdw'
});

const path = require('path');

const uploadStreamToCloudinary = (fileBuffer, folder = 'vtest_cms', resourceType = 'auto', originalName = '') => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: true,
    };

    if (originalName) {
      const ext = path.extname(originalName);
      const nameWithoutExt = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      uploadOptions.public_id = `${nameWithoutExt}_${Date.now()}${ext}`;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (err) {
    console.error('Cloudinary delete error:', err);
  }
};

module.exports = {
  cloudinary,
  uploadStreamToCloudinary,
  deleteFromCloudinary
};
