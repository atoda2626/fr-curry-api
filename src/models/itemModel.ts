import pool from "../db/index";

export const getAllItems = async () => {
  const result = await pool.query(
    'SELECT id, type, name, description, price, image_path as "imagePath" FROM items WHERE deleted = false ORDER BY id'
  );
  return result.rows;
};

export const getItemById = async (id: number) => {
  const result = await pool.query(
    'SELECT id, type, name, description, price, image_path as "imagePath" FROM items WHERE id = $1 AND deleted = false',
    [id]
  );
  return result.rows[0];
};
