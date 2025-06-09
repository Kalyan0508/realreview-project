const db = require('../db/db');

/**
 * 
 * @param {Object} data - Key-value pairs of column names and values.
 */
exports.insertImage = async (data) => {
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    throw new Error("No data provided for insertion");
  }

  const keys = Object.keys(data);              
  const values = Object.values(data);          

  const columns = keys.join(", ");             
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", "); 

  const query = `INSERT INTO images (${columns}) VALUES (${placeholders})`;

  return db.query(query, values);
};


exports.getAllImages = async () => {
  const query = `
    SELECT id, user_name, location, image_path, timestamp 
    FROM images 
    ORDER BY timestamp DESC
  `;
  const result = await db.query(query);
  return result.rows;
};
