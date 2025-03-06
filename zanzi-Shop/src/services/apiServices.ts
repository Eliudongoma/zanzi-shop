import { Product, User } from "../types";
import { ApiService } from "./api";

export const productService = new ApiService<Product>("/products");
export const userService = new ApiService<User>("/users");
