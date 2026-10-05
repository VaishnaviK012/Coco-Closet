import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const cartItem = await CartItem.create(req.body);

    return res.status(201).json({
      message: "Cart item saved successfully",
      cartItem,
    });
  } catch (error) {
    console.error("CART ITEM ERROR:", error);

    return res.status(500).json({
      message: "Failed to save cart item",
      error: error.message,
    });
  }
});

export default router;