import { Product } from "../types";
import { ApiService } from "./api";

export const productService = new ApiService<Product>("/products");
