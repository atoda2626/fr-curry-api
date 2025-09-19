import { getAllItems, getItemById } from "../models/itemModel.js";
import pool from "../db/index.js";

beforeAll(async () => {
  await pool.query(
    "INSERT INTO items (id, name, price) VALUES (999, 'テストカレー', 1000)"
  );
});

afterAll(async () => {
  await pool.query("DELETE FROM items WHERE id = 999");
  await pool.end();
});

test("全商品が取得できる", async () => {
  const items = await getAllItems();
  expect(items.length).toBeGreaterThan(0);
});

test("指定IDの商品が取得できる", async () => {
  const item = await getItemById(999);
  expect(item).toBeDefined();
  expect(item?.name).toBe("テストカレー");
  expect(item?.price).toBe(1000);
});
