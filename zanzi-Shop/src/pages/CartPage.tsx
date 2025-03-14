import { 
  Box, 
  Heading, 
  Text, 
  Image, 
  Flex, 
  Button, 
  Input, 
  VStack, 
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useCustomColor } from "../hooks/useCustomColor";
import { BsCart4 } from "react-icons/bs";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const {textColor, buttonBg, buttonText} = useCustomColor()

  return (
    <Box maxW="container.md" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={6}>
        Your Cart
      </Heading>

      {cart.length === 0 ? (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="60vh"
        textAlign="center"
        bgGradient="linear(to-b, gray.700, gray.900)"
        color="white"
        borderRadius="lg"
        boxShadow="lg"
        p={8}
      >
        <VStack gap={5}>
          <Icon as={BsCart4} boxSize={20} color={textColor} />
          <Heading size="lg">Your Cart is Empty</Heading>
          <Text fontSize="md" color={textColor}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <Button color={buttonText}  bg={buttonBg} onClick={() => navigate('/')}>Start Shopping</Button>
        </VStack>
      </Box>
      ) : (
        <VStack gap={4} align="stretch" divideY="2px">
          {cart.map((item) => (
            <Box 
              key={item._id} 
              borderWidth={1} 
              borderRadius="md" 
              p={4}
              _hover={{ shadow: "md" }}
            >
              <Flex align="center" justify="space-between">
                <HStack gap={4}>
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    boxSize="50px" 
                    objectFit="cover" 
                    borderRadius="md"
                  />
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      {item.name}
                    </Text>
                    <Text color="gray.600">
                      ${item.price.toFixed(2)}
                    </Text>
                  </Box>
                </HStack>
                <HStack gap={4}>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    min={1}
                    width="70px"
                    size="sm"
                  />
                  <Button
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </Button>
                </HStack>
              </Flex>
            </Box>
          ))}


          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">
              Total: ${getCartTotal().toFixed(2)}
            </Text>
            <Button 
              colorScheme="blue" 
              onClick={clearCart}
              size="md"
            >
              Clear Cart
            </Button>
          </Flex>
        </VStack>
      )}
    </Box>
  );
};