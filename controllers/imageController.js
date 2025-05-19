const path = require('path');
const { insertImage, getAllImages } = require('../repositories/imageRepository');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.body || !req.file) {
      return res.status(400).json({ error: "Missing required fields or image file" });
    }

    const { user_name, location, ...rest } = req.body;
    if (!user_name || !location) {
      return res.status(400).json({ error: "user_name and location are required" });
    }

    const imageData = {
      user_name,
      location,
      image_path: req.file.path,
      timestamp: new Date(),
      ...rest // if any additional optional fields are added in future
    };

    await insertImage(imageData);
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await getAllImages();
    res.status(200).json(images);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
