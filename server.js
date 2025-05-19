const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path= require("path");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));
// at the top of server.js, after app initialization:
app.use(express.static(path.join(__dirname, 'public')));

// Routes

const imageRoutes = require("./routes/imageRoutes");
app.use("/api", imageRoutes);

// Try binding to desired port, fallback to available one if taken
const DEFAULT_PORT = process.env.PORT || 3000;
const server = app.listen(DEFAULT_PORT, () => {
  console.log(` Server running on port ${server.address().port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(` Port ${DEFAULT_PORT} is in use. Trying a random port...`);
    const fallbackServer = app.listen(0, () => {
      const port = fallbackServer.address().port;
      console.log(` Server running on fallback port ${port}`);
    });
  } else {
    console.error(' Server error:', err);
  }
});
