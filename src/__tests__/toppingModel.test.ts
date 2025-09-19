import { getAllToppings } from "../models/toppingModel.js";

test("トッピング一覧が取得できる", async () => {
  const toppings = await getAllToppings();
  expect(Array.isArray(toppings)).toBe(true);
});
