import { ProductQuery } from "../../App";


interface ProductProps {
  productQuery: ProductQuery;
}

const ProductGrid = ({ productQuery: product }: ProductProps) => {

  
  return (
    <div>
      <h1>{product.search}</h1>
    </div>
  );
};