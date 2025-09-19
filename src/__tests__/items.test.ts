import request from "supertest";
import app from "../app";

describe("GET /items", () => {
  it("200で商品リストを返す", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /items/:id", () => {
  it("存在するIDなら200で商品を返す", async () => {
    const res = await request(app).get("/items/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("存在しないIDなら404を返す", async () => {
    const res = await request(app).get("/items/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Item not found");
  });
});
