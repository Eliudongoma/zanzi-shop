import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.put("/products:id", getProduct);
router.put("/products:id", updateProduct);
router.delete("/products:id", deleteProduct);

export default router;
