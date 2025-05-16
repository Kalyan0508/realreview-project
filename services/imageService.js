const imageRepo = require('../repositories/imageRepository');

exports.uploadImage = async (req) => {
  if (!req.body || !req.file) {
    throw new Error("Missing required fields or image file");
  }

  const { user, location } = req.body;
  if (!user || !location) {
    throw new Error("User and location are required");
  }

  const imagePath = req.file.path;
  const timestamp = new Date();

  await imageRepo.insertImage(user, location, imagePath, timestamp);
};

exports.getImages = async () => {
  const result = await imageRepo.getAllImages();
  return result;
};
