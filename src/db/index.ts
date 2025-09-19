import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: String(process.env.PGPASSWORD),
  port: parseInt(process.env.PGPORT || "5432"),
});

//商品一覧取得
export async function getItems() {
  try {
    const result = await pool.query(
      'SELECT id, type, name, description, price, image_path as "imagePath", deleted, created_at, updated_at FROM items WHERE deleted = false OR deleted IS NULL ORDER BY id'
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching items:", err);
    throw err;
  }
}

//商品詳細
export async function getItemById(id: number) {
  try {
    const result = await pool.query(
      'SELECT id, type, name, description, price, image_path as "imagePath", deleted, created_at, updated_at FROM items WHERE id = $1 AND (deleted = false OR deleted IS NULL)',
      [id]
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error("Error fetching item by id:", err);
    throw err;
  }
}

//トッピング一覧
export async function getToppings() {
  try {
    const result = await pool.query("SELECT * FROM toppings ORDER BY id");
    return result.rows;
  } catch (err) {
    console.error("Error fetching toppings:", err);
    throw err;
  }
}

export default pool;
