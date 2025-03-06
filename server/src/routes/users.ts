// In userRoutes.js
import express from "express";
//import { getUser, createUser, updateUser, deleteUser, getAllUsers } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { register } from "../controllers/authController.js";

const router = express.Router();

// Add this line for creating a new user
router.post("/users", register); // Create a new user (POST to /api/users)

// router.get("/", authenticate, getAllUsers);
// router.get("/:id", authenticate, getUser);
// router.put("/:id", authenticate, updateUser);
// router.delete("/:id", authenticate, deleteUser);

export default router;