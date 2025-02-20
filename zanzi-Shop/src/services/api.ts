import axios from "axios";
import { Product } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const productService = {
  getAll: async () => {
    try {
      const response = await api.get<Product[]>("/products");
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
      const response = await api.get<Product>(`/products/${id}`);
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
      const response = await api.post<Product>("/products", product);
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
      const response = await api.put<Product>(`/products/${product._id}`, product);
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
      const response = await api.delete<Product>(`/products/${id}`);
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
