const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Body parsing middleware

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

const imageRoutes = require("./routes/imageRoutes");
app.use("/api", imageRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
