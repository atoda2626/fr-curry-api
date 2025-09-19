// import express from "express";
// import pool from "../db/index.js";

// const router = express.Router();

// // 全商品取得（ページネーション、ソート対応）
// router.get("/", async (req, res) => {
//   try {
//     console.log("=== API DEBUG ===");
//     console.log("Request query:", req.query);

//     const { _page, _limit, _sort, _order } = req.query;

//     let query =
//       'SELECT id, type, name, description, price, image_path as "imagePath", deleted, created_at, updated_at FROM items WHERE deleted = false';
//     let countQuery = "SELECT COUNT(*) FROM items WHERE deleted = false";
//     const params: any[] = [];

//     // ソート機能
//     if (_sort && _order) {
//       if (_sort === "price") {
//         query += ` ORDER BY price ${_order === "desc" ? "DESC" : "ASC"}`;
//       } else {
//         query += " ORDER BY id ASC";
//       }
//     } else {
//       query += " ORDER BY id ASC";
//     }

//     // ページネーション
//     if (_page && _limit) {
//       const page = parseInt(_page as string);
//       const limit = parseInt(_limit as string);
//       const offset = (page - 1) * limit;

//       query += ` LIMIT $1 OFFSET $2`;
//       params.push(limit, offset);
//     }

//     console.log("Final query:", query);
//     console.log("Query params:", params);

//     // データ取得
//     const result = await pool.query(query, params);

//     // 総件数取得（ページネーション用）
//     const countResult = await pool.query(countQuery);
//     const totalCount = parseInt(countResult.rows[0].count);

//     // レスポンスヘッダーに総件数を設定
//     res.set("X-Total-Count", totalCount.toString());

//     // データ構造をJSONサーバー形式に合わせる
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.get("/topping", async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT id, name, price FROM toppings ORDER BY id"
//     );
//     res.status(200).json(result.rows);
//     //res.status(200).json(toppings);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // /orderItems エンドポイント
// router.get("/orderItems", async (req, res) => {
//   try {
//     const result = await pool.query(
//       'SELECT id, name, price, image_path as "imagePath", topping_list as "toppingList", count, total_price as "TotalPrice" FROM order_items ORDER BY id'
//     );
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/orderItems", async (req, res) => {
//   try {
//     const { name, price, imagePath, toppingList, count, TotalPrice } = req.body;
//     const result = await pool.query(
//       "INSERT INTO order_items (name, price, image_path, topping_list, count, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [name, price, imagePath, JSON.stringify(toppingList), count, TotalPrice]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // /order エンドポイント
// router.get("/order", async (req, res) => {
//   try {
//     res.status(200).json([]);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       'SELECT id, type, name, description, price, image_path as "imagePath", deleted, created_at, updated_at FROM items WHERE id = $1 AND deleted = false',
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error("Database error:", error);

//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.delete("/orderItems/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     // データベースから該当商品を削除
//     const result = await pool.query("DELETE FROM order_items WHERE id = $1", [
//       id,
//     ]);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

import express from "express";
import { getAllItems, getItemById } from "../models/itemModel";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { _page, _limit } = req.query;
    const items = await getAllItems();
    if (_page && _limit) {
      const page = parseInt(_page as string, 10);
      const limit = parseInt(_limit as string, 10);
      const start = (page - 1) * limit;
      const end = start + limit;

      // ページ分だけ返す
      const paginated = items.slice(start, end);

      res.set("X-Total-Count", items.length.toString()); // ←総件数をレスポンスヘッダーに入れる
      return res.status(200).json(paginated);
    }

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await getItemById(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

export default router;
