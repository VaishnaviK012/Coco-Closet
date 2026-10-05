import mongoose from "mongoose";

const billingItemSchema = new mongoose.Schema(
  {
    productId: String,
    productName: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: Number,

    fullName: String,
    email: String,
    address: String,

    paymentMethod: String,

    subtotal: Number,
    shipping: Number,
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.model("BillingItem", billingItemSchema);