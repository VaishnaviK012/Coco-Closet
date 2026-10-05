
import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ===============================
// ADD TO CART
// POST /api/cart
// ===============================

router.post("/", async (req, res) => {
  try {
    const {
      productId,
      name,
      price,
      image,
      quantity = 1,

      // ===============================
      // LEFT SIDE FILTERS
      // ===============================

      size,
      color,
      brand,
      collection,
      tag,
      maxPrice,
    } = req.body;

    // ===============================
    // VALIDATION
    // ===============================

    if (
      !productId ||
      !name ||
      price === undefined ||
      !image
    ) {
      return res.status(400).json({
        message: "Product details are required",
      });
    }

    if (!size) {
      return res.status(400).json({
        message: "Size is required",
      });
    }

    if (!color) {
      return res.status(400).json({
        message: "Color is required",
      });
    }

    if (!brand) {
      return res.status(400).json({
        message: "Brand is required",
      });
    }

    if (!collection) {
      return res.status(400).json({
        message: "Collection is required",
      });
    }

    if (!tag) {
      return res.status(400).json({
        message: "Tag is required",
      });
    }

    if (maxPrice === undefined) {
      return res.status(400).json({
        message: "Maximum price is required",
      });
    }

    // ===============================
    // CREATE CART ITEM
    // ===============================

    const cartItem = await Cart.create({
      productId: String(productId),

      name: String(name),

      price: Number(price),

      image: String(image),

      quantity: Number(quantity) || 1,

      // ===============================
      // SAVE FILTERS
      // ===============================

      size: String(size),

      color: String(color),

      brand: String(brand),

      collection: String(collection),

      tag: String(tag),

      maxPrice: Number(maxPrice),
    });

    // ===============================
    // SUCCESS
    // ===============================

    return res.status(201).json({
      message:
        "Product and selected filters stored successfully",

      cartItem,
    });
  } catch (error) {
    console.error("ADD CART ERROR:", error);

    return res.status(500).json({
      message: "Failed to store product",
      error: error.message,
    });
  }
});

// ===============================
// GET CART
// GET /api/cart
// ===============================

router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Cart fetched successfully",
      cartItems,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
});

// ===============================
// GET SINGLE CART ITEM
// GET /api/cart/:id
// ===============================

router.get("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(
      req.params.id
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Cart item fetched successfully",
      cartItem,
    });
  } catch (error) {
    console.error(
      "GET SINGLE CART ERROR:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch cart item",
      error: error.message,
    });
  }
});

// ===============================
// DELETE CART ITEM
// DELETE /api/cart/:id
// ===============================

router.delete("/:id", async (req, res) => {
  try {
    const cartItem =
      await Cart.findByIdAndDelete(
        req.params.id
      );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      message:
        "Cart item removed successfully",
    });
  } catch (error) {
    console.error(
      "DELETE CART ERROR:",
      error
    );

    return res.status(500).json({
      message: "Failed to remove cart item",
      error: error.message,
    });
  }
});

export default router;

