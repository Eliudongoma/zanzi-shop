import { Request, Response } from "express";
import Product from "../models/Product.js";
import createCRUDController from "./genericController.js";

// Create Product-specific controller
const productController = createCRUDController(Product);

// Export individual functions
export const getAllProducts = productController.getAll;
export const getProduct = productController.getById;
export const createProduct = productController.create;
export const updateProduct = productController.update;
export const deleteProduct = productController.delete;