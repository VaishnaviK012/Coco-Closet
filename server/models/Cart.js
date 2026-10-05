import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    // =========================
    // SELECTED FILTER DETAILS
    // =========================

    size: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    collection: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      required: true,
    },

    maxPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;