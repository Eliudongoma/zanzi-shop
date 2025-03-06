import { useState, useCallback, useEffect } from "react";
import { productService } from "../services/apiServices";
import { Product } from "../types";

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data: Product[] = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, fetchProducts };
};

export default useFetchProducts;
