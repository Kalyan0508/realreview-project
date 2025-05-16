// const db = require("../db/db");

// exports.uploadImage = async (req, res) => {
//   try {
//     // Check if body and file are present
//     if (!req.body || !req.file) {
//       return res.status(400).json({ error: "Missing required fields or image file" });
//     }

//     const { user, location } = req.body;
//     const imagePath = req.file.path;
//     const timestamp = new Date();

//     // Validate individual fields
//     if (!user || !location) {
//       return res.status(400).json({ error: "User and location are required" });
//     }

//     await db.query(
//       "INSERT INTO images (user_name, location, image_path, timestamp) VALUES ($1, $2, $3, $4)",
//       [user, location, imagePath, timestamp]
//     );

//     res.status(201).json({ message: "Image uploaded successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getImages = async (req, res) => {
//   try {
//     const result = await db.query("SELECT * FROM images ORDER BY timestamp DESC");
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const imageService = require('../services/imageService');

exports.uploadImage = async (req, res) => {
  try {
    const result = await imageService.uploadImage(req);
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const result = await imageService.getImages();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
