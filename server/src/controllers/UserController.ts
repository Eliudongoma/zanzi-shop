import { Request, Response } from "express";
import User from "../models/User.js";
import createCRUDController from "./genericController.js";

// Create User-specific controller
const userController = createCRUDController(User, "User");

// Export individual functions
export const getAllUsers = userController.getAll;
export const getUser = userController.getById;
export const createUser = userController.create;
export const updateUser = userController.update;
export const deleteUser = userController.delete;