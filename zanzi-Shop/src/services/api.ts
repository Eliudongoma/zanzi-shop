import axios from "axios";
import { Product } from "../types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const productService = {
  getAll: () => api.get<Product[]>("/products").then((res) => res.data),

  get: (id: string) =>
    api.get<Product>(`/products/${id}`).then((res) => res.data),

  create: (product: Product) =>
    api.post<Product>("/products", product).then((res) => res.data),

  update: (product: Product) =>
    api
      .put<Product>(`/products/${product._id}`, product)
      .then((res) => res.data),
      
  delete: (id: string) =>
    api.delete<Product>(`/products/${id}`).then((res) => res.data),
};
