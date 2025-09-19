import express from "express";
import {
  getAllOrderItems,
  addOrderItem,
  deleteOrderItem,
} from "../models/orderItemModel";

const router = express.Router();

// 注文アイテム一覧取得
router.get("/", async (req, res, next) => {
  try {
    const orderItems = await getAllOrderItems();
    res.status(200).json(orderItems);
  } catch (error) {
    next(error);
  }
});

// 注文アイテム追加
router.post("/", async (req, res, next) => {
  try {
    const { name, price, imagePath, toppingList, count, totalPrice, orderId } =
      req.body;

    const newOrderItem = await addOrderItem(
      name,
      price,
      imagePath,
      toppingList,
      count,
      orderId
    );
    res.status(201).json(newOrderItem);
  } catch (error) {
    next(error);
  }
});

// 注文アイテム削除
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteOrderItem(Number(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
