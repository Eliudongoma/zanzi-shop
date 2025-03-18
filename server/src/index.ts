import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";
import config from "./config.js";
import { connectDB } from "./data/db.js";
import auth from "./routes/auth.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);

const { PORT, MONGO_URI } = config;

connectDB();
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
