const imageRepo = require('../repositories/imageRepository');

exports.uploadImage = async (req) => {
  if (!req.body || !req.file) {
    throw new Error("Missing required fields or image file");
  }

  const { user, location } = req.body;

  // Validate user and location
  if (!user || !location) {
    throw new Error("user and location are required");
  }

  const imagePath = req.file.path;
  const timestamp = new Date().toISOString();

  const data = {
    user_name: user,
    location,
    image_path: imagePath,
    timestamp,
  };

  const result = await imageRepo.dynamicInsert('images', data, ['user_name', 'location']);

  if (result.error) {
    throw new Error(result.error);
  }
};

exports.getImages = async () => {
  const result = await imageRepo.getAllImages();
  return result;
};
