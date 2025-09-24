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
