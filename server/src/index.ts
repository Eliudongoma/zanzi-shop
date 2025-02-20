import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import config from "./config.js";
import { connectDB } from "./data/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json([
    { _id: 1, name: "Product 1", price: 10 },
    { _id: 2, name: "Product 2", price: 20 },
  ]);
});
const { PORT, MONGO_URI } = config;

connectDB()
  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
