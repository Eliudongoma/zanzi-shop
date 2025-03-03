import axios from "axios";
import { Product } from "../types";

type messageProduct ={
  message: string;
  product:Product;
}

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const productService = {
  getAll: async () => {
    try {
      const response = await api.get<Product[]>("/products");
      if (!response.data) throw new Error("Network Error");
      return response.data;
    } catch (error) {
      console.error("Error fetching products", error);
      if (axios.isAxiosError(error)) {
        console.error("Error Response", error.response?.data || error.message);
      }
      throw error;
    }
  },

  get: async (id: string) => {
    try {
      const response = await api.get<messageProduct>(`/products${id}`);
      if (!response.data) throw new Error("Network Error");

      return response.data;
    } catch (error) {
      console.error("Error fetching product", error);
      if (axios.isAxiosError(error)) {
        console.error("Error Response", error.response?.data || error.message);
      }
      throw error;
    }
  },

  create: async (product: Product) => {
    try {
      const response = await api.post<messageProduct>("/products", product);
      if (!response.data) throw new Error("Network Error");

      return response.data;
    } catch (error) {
      console.error("Error creating product", error);
      if (axios.isAxiosError(error)) {
        console.error("Error Response", error.response?.data || error.message);
      }
      throw error;
    }
  },

  update: async (product: Product) => {
    try {
      const response = await api.put<messageProduct>(
        `/products${product._id}`,
        product
      );
      if (!response.data) throw new Error("Network Error");

      return response.data;
    } catch (error) {
      console.error("Error updating product", error);
      if (axios.isAxiosError(error)) {
        console.error("Error Response", error.response?.data || error.message);
      }
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<messageProduct>(`/products${id}`);
      if (!response.data) throw new Error("Network Error");

      return response.data;
    } catch (error) {
      console.error("Error deleting product", error);
      if (axios.isAxiosError(error)) {
        console.error("Error Response", error.response?.data || error.message);
      }
      throw error;
    }
  },
};
