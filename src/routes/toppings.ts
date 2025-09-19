// src/routes/toppings.ts
import express from "express";
import { getAllToppings } from "../models/toppingModel";

const router = express.Router();

// GET /topping
router.get("/", async (req, res, next) => {
  try {
    const topping = await getAllToppings();
    res.status(200).json(topping);
  } catch (error) {
    next(error);
  }
});

export default router;
