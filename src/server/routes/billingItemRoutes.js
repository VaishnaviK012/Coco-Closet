import express from "express";
import BillingItem from "../models/BillingItem.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const billingItem = await BillingItem.create(req.body);

    res.status(201).json({
      success: true,
      billingItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;