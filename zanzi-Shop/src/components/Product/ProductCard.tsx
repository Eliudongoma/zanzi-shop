import { Button, Card, Image, Text } from "@chakra-ui/react";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types";
import { toaster } from "../ui/toasterComp";
import getCroppedImage from "../../services/imageUrls";
import { useCustomColor } from "../../hooks/useCustomColor";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { buttonBg, textColor } = useCustomColor();

  const handleAddToCart = () => {
    addToCart(product);
    toaster.create({
      title: "Product added to cart",
      type: "success",
      duration: 3000,
    });
  };

  return (
    <Card.Root>
      <Image src={getCroppedImage(product.imageUrl)} />
      <Card.Body gap="2">
        <Card.Title color={textColor}>{product.name}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
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
        <Button
          variant="outline"
          onClick={handleAddToCart}
          borderRadius={4}
          color={buttonBg}
        >
          Add to cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
