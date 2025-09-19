import pool from "../db/index";

// アイテム一覧
export const getAllOrderItems = async () => {
  const result = await pool.query(
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
     ORDER BY id`
  );
  return result.rows;
};

// アイテム追加
export const addOrderItem = async (
  name: string,
  price: number,
  imagePath: string,
  toppingList: any[],
  count: number,
  orderId?: number
) => {
  const finalOrderId = orderId || 1;

  const totalPrice = price * count;

  const result = await pool.query(
    `INSERT INTO order_items 
      (name, price, image_path, topping_list, count, totalPrice, order_id) 
     VALUES ($1,$2,$3,$4,$5,$6,$7) 
     RETURNING *`,
    [
      name,
      price,
      imagePath,
      JSON.stringify(toppingList),
      count,
      totalPrice,
      finalOrderId,
    ]
  );
  return result.rows[0];
};

// アイテム削除
export const deleteOrderItem = async (id: number) => {
  await pool.query("DELETE FROM order_items WHERE id = $1", [id]);
  return { success: true };
};
