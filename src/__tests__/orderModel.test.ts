import { getAllOrders, addOrder } from "../models/orderModel.js";
import pool from "../db/index.js";

beforeAll(async () => {
  // 初期化（ordersテーブルを空にしてから開始すると安心）
  await pool.query("DELETE FROM orders");
});

afterAll(async () => {
  await pool.query("DELETE FROM orders");
  await pool.end();
});

test("注文を追加できる", async () => {
  const newOrder = await addOrder(1, 2000); // userId=1, totalPrice=2000
  expect(newOrder).toBeDefined();
  expect(newOrder.total_price).toBe(2000);
});

test("注文一覧が取得できる", async () => {
  const orders = await getAllOrders();
  expect(Array.isArray(orders)).toBe(true);
  expect(orders.length).toBeGreaterThan(0);
});
