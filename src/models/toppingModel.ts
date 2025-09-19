import pool from "../db/index";

export const getAllToppings = async () => {
  const result = await pool.query(
    "SELECT id, name,price FROM toppings ORDER BY id"
  );
  return result.rows;
};
