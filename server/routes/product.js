import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

export default router;