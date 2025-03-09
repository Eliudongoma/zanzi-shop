import { SimpleGrid } from "@chakra-ui/react";
import useFetchProducts from "../../hooks/FetchData/useFetchProducts";
import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";

const ProductGrid = () => {
  const { data:products, loading } = useFetchProducts();
  const skeletons = [1, 2, 3, 4, 5, 6,7,8];
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px" gap={6}>
      {loading ? (
        skeletons.map((skeleton) =>(
        <ProductContainer key={skeleton}>
          <SkeletonProductCard />
        </ProductContainer>
      ))) : (
        products.map((product) => (
          <ProductContainer key={product._id}>
            <ProductCard product={product}></ProductCard>
          </ProductContainer>
        ))
      )}
    </SimpleGrid>
  );
};

export default ProductGrid;
