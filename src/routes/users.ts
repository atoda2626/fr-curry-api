// src/routes/users.ts
import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json(result.rows); // [{ id, name, email }]
  } catch (err) {
    console.error("Error in /users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
