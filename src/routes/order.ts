import express from "express";
import { getAllOrders, addOrder, getOrderById } from "../models/orderModel";

const router = express.Router();

// 注文一覧取得
router.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 注文詳細取得
router.get("/:id", async (req, res, next) => {
  try {
    const order = await getOrderById(Number(req.params.id));
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// 注文作成（確定）
router.post("/", async (req, res, next) => {
  try {
    const { userId, totalPrice } = req.body;

    if (!userId || !totalPrice) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const newOrder = await addOrder(userId, totalPrice);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

export default router;
