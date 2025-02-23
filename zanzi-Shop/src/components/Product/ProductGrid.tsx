import { SimpleGrid } from "@chakra-ui/react";
import { ProductQuery } from "../../App";
import useFetchProducts from "../../hooks/useFetchProducts";
import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";

interface ProductProps {
  productQuery: ProductQuery;
}

const ProductGrid = ({ productQuery: product }: ProductProps) => {
  const {products} =  useFetchProducts();
  return (
    <SimpleGrid 
    columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      gap={6}
      >
{products.map((product)=>(
  <ProductContainer key={product._id}>
    <ProductCard product={product}></ProductCard>
  </ProductContainer>
))}
    </SimpleGrid>
  );
};

export default ProductGrid;
