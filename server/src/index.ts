import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/products";
import config from "../config";

const app = express();

app.use(cors());
app.use(express.json());
const { PORT, MONGO_URI } = config;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
