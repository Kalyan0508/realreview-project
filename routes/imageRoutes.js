const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage, getImages } = require("../controllers/imageController");

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("image"), uploadImage);
router.get("/images", getImages);

module.exports = router;
