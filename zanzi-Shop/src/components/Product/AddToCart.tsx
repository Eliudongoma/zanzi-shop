import { Button } from "@chakra-ui/react";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../types";
import { useCustomColor } from "../../hooks/useCustomColor";
import toast from "react-hot-toast";

export const AddToCartButton: React.FC<{ item: CartItem }> = ({ item }) => {
  const { buttonBg, buttonText, asideText } = useCustomColor();
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = cart.some((cartItem) => cartItem._id === item._id);

  // Toggle between add and remove based on presence in cart
  const handleClick = () => {
    if (isInCart) {
      removeFromCart(item._id);
      toast.success("Removed Successfully!")

    } else {
      addToCart(item);
      toast.success("Added Successfully!")
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      borderRadius={4}
      bg={isInCart ? asideText : buttonBg}  // Different background when in cart
      color={isInCart ? "white" : buttonText}  // Different text color when in cart
      _hover={{ bg: isInCart ? "red.600" : "gray.200" }}  // Different hover state
    >
      {isInCart ?"Remove from  Cart" : "Add to cart"}
    </Button>
  );
};
