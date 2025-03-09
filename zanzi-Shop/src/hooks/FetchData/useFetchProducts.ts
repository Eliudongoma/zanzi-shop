import { productService } from "../../services/apiServices";
import { Product } from "../../types";
import useFetch from "./useFetch";

const useFetchProducts = () => {
  return useFetch<Product[]>( (signal) => productService.getAll(signal), [])
};

export default useFetchProducts;
