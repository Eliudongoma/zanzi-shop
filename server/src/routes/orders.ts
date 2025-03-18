import express  from "express";
import { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder } from "../controllers/orderController.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/order", createOrder);
router.get("/order:_id", getOrder);
router.get("/orders", getAllOrders);
router.put("/order:_id", updateOrder);
router.delete("/order:_id", deleteOrder);

export default router;