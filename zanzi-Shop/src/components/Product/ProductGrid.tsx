import { SimpleGrid } from "@chakra-ui/react";
import useFetchProducts from "../../hooks/FetchData/useFetchProducts";
import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";
import AppError from "../AppError";

const ProductGrid = () => {
  const { data:products, loading, error,isOffline } = useFetchProducts();
  const skeletons = [1, 2, 3, 4, 5, 6,7,8];

  if (error || isOffline) {
    return (
      <AppError
        error={error || new Error("No internet connection")}
        customTitle={isOffline ? "You’re Offline" : undefined}
        onRetry={() => window.location.reload()}
        retryText="Try Again"
      />
    );
  }
  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} padding="5px" gap={6}>
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
