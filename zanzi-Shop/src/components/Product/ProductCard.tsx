import { Card, Image, Text } from "@chakra-ui/react";
import { Product } from "../../types";
import getCroppedImage from "../../services/imageUrls";
import { useCustomColor } from "../../hooks/useCustomColor";
import { AddToCartButton } from "./AddToCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { textColor } = useCustomColor();
  
  return (
    <Card.Root maxW={"sm"}>
      <Image 
      src={getCroppedImage(product.imageUrl)}
      objectFit="cover" 
        maxH="300px"  
        loading="lazy"
        maxW="400px" 
        alt={product.name}
       />
      <Card.Body gap="2">
        <Card.Title color={textColor}>{product.name}</Card.Title>
        <Text
          textStyle="2xl"
          fontWeight="medium"
          letterSpacing="tight"
          mt="2"
          color={textColor}
        >
          ksh {product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <AddToCartButton item={{ ...product, quantity: 1 }}/>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
