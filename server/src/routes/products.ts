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
router.get("/products:_id", getProduct);
router.put("/products:_id", updateProduct);
router.delete("/products:_id", deleteProduct);

export default router;
