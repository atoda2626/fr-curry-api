import pool from "../db/index";

// 注文一覧
export const getAllOrders = async () => {
  const result = await pool.query(
    `SELECT 
        id, 
        user_id AS "userId", 
        total_price AS "totalPrice", 
        status, 
        created_at AS "createdAt"
     FROM orders
     ORDER BY created_at DESC`
  );
  return result.rows;
};

// 注文詳細（+紐づくアイテム）
export const getOrderById = async (orderId: number) => {
  const orderResult = await pool.query(
    `SELECT 
        id, 
        user_id AS "userId", 
        total_price AS "totalPrice", 
        status, 
        created_at AS "createdAt"
     FROM orders
     WHERE id = $1`,
    [orderId]
  );
  const order = orderResult.rows[0];
  if (!order) return null;

  const itemsResult = await pool.query(
    `SELECT 
        id, 
        name, 
        price, 
        image_path AS "imagePath", 
        topping_list AS "toppingList", 
        count, 
        total_price AS "totalPrice",
        order_id AS "orderId"
     FROM order_items
     WHERE order_id = $1`,
    [orderId]
  );

  return { ...order, items: itemsResult.rows };
};

// 注文作成
export const addOrder = async (
  userId: number,
  totalPrice: number,
  status: string = "pending"
) => {
  const result = await pool.query(
    `INSERT INTO orders (user_id, total_price, status)
     VALUES ($1, $2, $3)
     RETURNING id, user_id AS "userId", total_price AS "totalPrice", status, created_at AS "createdAt"`,
    [userId, totalPrice, status]
  );
  return result.rows[0];
};
