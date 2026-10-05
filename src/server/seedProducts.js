import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Elegant Summer Dress",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    category: "Women",
    description: "Elegant and comfortable summer dress.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink", "White"],
  },
  {
    name: "Classic Black Dress",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
    category: "Women",
    description: "Classic black dress for every occasion.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
  },
  {
    name: "Casual Denim Outfit",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    category: "Women",
    description: "Stylish casual denim outfit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
  },
  {
    name: "White Casual Top",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800",
    category: "Women",
    description: "Simple and stylish casual top.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
  },
  {
    name: "Pink Fashion Dress",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800",
    category: "Women",
    description: "Beautiful pink fashion dress.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink"],
  },
  {
    name: "Winter Jacket",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800",
    category: "Women",
    description: "Warm and stylish winter jacket.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log("Products inserted successfully");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:", error);
    process.exit(1);
  }
};

seedProducts();