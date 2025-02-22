import { useState, useCallback, useEffect } from "react";
import { productService } from "../services/api";
import { Product } from "../types";

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const data: Product[] = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, fetchProducts };
};

export default useFetchProducts;
