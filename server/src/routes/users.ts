// In userRoutes.js
import express from "express";
import authenticate from "../middleware/auth.js";
import { register } from "../controllers/authController.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/users", register); // Create a new user (POST to /api/users)

router.get("/users", authenticate, getAllUsers);
router.get("/users:_id", authenticate, getUser);
router.put("/users:_id", authenticate, updateUser);
router.delete("/users:_id", authenticate, deleteUser);

export default router;
