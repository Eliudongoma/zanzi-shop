import { useCallback } from "react";
import { productService } from "../../services/apiServices";
import { Product } from "../../types";
import useFetch from "./useFetch";

const useFetchProducts = () => {
  const fetchProducts = useCallback((signal: AbortSignal) => {
    return productService.getAll(signal);
  }, []); // Empty deps since productService.getAll doesn't depend on any props/state

  return useFetch<Product[]>(fetchProducts, [], true, 3, 1000);
};

export default useFetchProducts;
