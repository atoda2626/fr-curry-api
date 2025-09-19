import {
  getAllOrderItems,
  addOrderItem,
  deleteOrderItem,
} from "../models/orderItemModel.js";
import pool from "../db/index.js";

let insertedId: number;

beforeAll(async () => {
  const item = await addOrderItem(
    "テストカレー",
    1000,
    "/test.jpg",
    [],
    1,
    1000,
    1
  );
  insertedId = item.id;
});

afterAll(async () => {
  await pool.query("DELETE FROM order_items WHERE id = $1", [insertedId]);
  await pool.end();
});

test("注文アイテム一覧が取得できる", async () => {
  const items = await getAllOrderItems();
  expect(items.length).toBeGreaterThan(0);
});

test("注文アイテムを削除できる", async () => {
  const result = await deleteOrderItem(insertedId);
  expect(result.success).toBe(true);
});
