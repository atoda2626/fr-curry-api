import pool from "../db/index";

export const getCartItems = async (userId: number) => {
  const result = await pool.query(
    `SELECT c.id, c.user_id AS "userId", c.item_id AS "itemId", c.count,
            i.name, i.price, i.image_path AS "imagePath"
     FROM cart_items c
     JOIN items i ON c.item_id = i.id
     WHERE c.user_id = $1
     ORDER BY c.created_at DESC`,
    [userId]
  );
  return result.rows;
};

export const addCartItem = async (
  userId: number,
  itemId: number,
  count: number
) => {
  const result = await pool.query(
    `INSERT INTO cart_items (user_id, item_id, count)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, itemId, count]
  );
  return result.rows[0];
};

export const removeCartItem = async (id: number) => {
  await pool.query("DELETE FROM cart_items WHERE id = $1", [id]);
  return { success: true };
};
