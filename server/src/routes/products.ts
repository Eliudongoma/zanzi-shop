import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
} from "../controllers/ProductController.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();


router.get("/products", getAllProducts);
router.post("/products",authenticate, createProduct);
router.get("/products:_id",authenticate, getProduct);
router.put("/products:_id",authenticate, updateProduct);
router.delete("/products:_id",authenticate, deleteProduct);

export default router;
