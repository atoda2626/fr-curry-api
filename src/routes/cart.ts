import express from "express";
import { getCartItems, addCartItem, removeCartItem } from "../models/cartModel";

const router = express.Router();

//カート一覧
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await getCartItems(Number(req.params.userId));
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, itemId, count } = req.body;

    // 必須チェック
    if (!userId || !itemId) {
      return res.status(400).json({ error: "userId and itemId are required" });
    }

    // 数量チェック
    if (!count || count <= 0) {
      return res.status(400).json({ error: "count must be greater than 0" });
    }

    const newCartItem = await addCartItem(userId, itemId, count);
    res.status(201).json(newCartItem);
  } catch (error) {
    next(error);
  }
});

//カートから削除
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await removeCartItem(Number(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
export default router;
