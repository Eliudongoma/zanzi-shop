import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import config from "./config.js";
import { connectDB } from "./data/db.js";
import auth from './routes/auth.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth)

// app.get("/profile", authenticateUser, async (req, res) => {
//   res.json({message: "Access granted", user:req.userId});
// });
const { PORT, MONGO_URI } = config;

connectDB()
  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
