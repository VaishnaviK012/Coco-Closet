import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    brand: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;