const db = require('../db/db');

exports.insertImage = (user, location, imagePath, timestamp) => {
  return db.query(
    "INSERT INTO images (user_name, location, image_path, timestamp) VALUES ($1, $2, $3, $4)",
    [user, location, imagePath, timestamp]
  );
};

exports.getAllImages = async () => {
  const result = await db.query("SELECT * FROM images ORDER BY timestamp DESC");
  return result.rows;
};
