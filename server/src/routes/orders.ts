import express  from "express";
import { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder } from "../controllers/orderController.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders:_id", getOrder);
router.get("/orders", getAllOrders);
router.put("/orders:_id", updateOrder);
router.delete("/orders:_id", deleteOrder);

export default router;