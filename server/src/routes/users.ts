// In userRoutes.js
import express from "express";
//import { getUser, createUser, updateUser, deleteUser, getAllUsers } from "../controllers/userController.js";
import authenticate  from "../middleware/auth.js";
import { register } from "../controllers/authController.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/UserController.js";

const router = express.Router();

// Add this line for creating a new user
router.post("/users", register); // Create a new user (POST to /api/users)

router.get("/users", authenticate, getAllUsers);
router.get("/users:id", authenticate, getUser);
router.put("/users:id", authenticate, updateUser);
router.delete("/users:id", authenticate, deleteUser);

export default router;