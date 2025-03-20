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
  Badge,
  useMediaQuery,
  Icon,
} from "@chakra-ui/react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useCustomColor } from "../hooks/useCustomColor";
import { BsCart4 } from "react-icons/bs";
import {  useState } from "react";
import DeleteWarning from "../components/DeleteWarning";
import { CartItem } from "../types";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();
  const navigate = useNavigate();
  const { textColor, buttonBg, buttonText, bgColor } = useCustomColor();
  const [isLargerThanMd] = useMediaQuery(["(min-width: 768px)"], {
    ssr: false,
  });
  // State for the delete warning dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  // Open the delete warning for a specific item
  const handleDeleteClick = (item?: CartItem) => {
    if (item) setItemToDelete(item);
    else setItemToDelete(null);
    setIsDeleteOpen(true);
  };

  // Confirm the deletion
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete._id);
    }
    if (!itemToDelete) {
      clearCart();
    }
    setIsDeleteOpen(false);
    setItemToDelete(null);
  };

  // Close the dialog without deleting
  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setItemToDelete(null);
  };

  const handleQuantityChange = (id: string, value: number) => {
    if (value >= 1) updateQuantity(id, value);
  };
  // useEffect(() => {
  //   console.log("Updated itemToDelete:", itemToDelete);
  //   console.log("Updated isDeleteOpen:", isDeleteOpen);
  // }, [itemToDelete, isDeleteOpen]);

  return (
    <Box maxW="container.xl" mx="auto" p={4} bg={bgColor} minHeight="80vh">
      <Heading as="h1" size="xl" mb={6} color={textColor}>
        Cart ({cart.length})
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
              Looks like you haven’t added anything to your cart yet.
            </Text>
            <Button
              color={buttonText}
              bg={buttonBg}
              onClick={() => navigate("/")}
            >
              Start Shopping
            </Button>
          </VStack>
        </Box>
      ) : (
        <Flex
          direction={isLargerThanMd ? "row" : "column"}
          gap={6}
          align="flex-start"
        >
          {/* Product List */}
          <VStack
            gap={4}
            align="stretch"
            flex={isLargerThanMd ? 2 : 1}
            w={isLargerThanMd ? "65%" : "100%"}
          >
            {cart.map((item) => (
              <Box
                key={item._id}
                borderWidth={1}
                borderRadius="md"
                p={4}
                bg="white"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
              >
                <Flex
                  align={isLargerThanMd ? "center" : "start"}
                  justify="space-between"
                  gap={4}
                  direction={isLargerThanMd ? "row" : "column"}
                >
                  <HStack gap={4} flex={1}>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      boxSize="80px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box>
                      <Text fontWeight="bold" fontSize="lg" color={textColor}>
                        {item.name}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {item.stock === 0 ? "Out of stock" : "In Stock"}{" "}
                        <Badge color={textColor}>ZANZI</Badge>
                      </Text>
                      <Text fontSize="md" color={textColor}>
                        KSh {item.price.toFixed(2)}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack
                    gap={2}
                    align="center"
                    mt={isLargerThanMd ? 0 : 4} // Move to bottom on small screens
                    w={isLargerThanMd ? "auto" : "100%"} // Full width on small screens
                  >
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleDeleteClick(item)}
                    >
                      Remove
                    </Button>
                    <HStack>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                        color={textColor}
                        min={1}
                        width="60px"
                        textAlign="center"
                        size="sm"
                      />
                      <Button
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </HStack>
                  </HStack>
                </Flex>
              </Box>
            ))}
            {isDeleteOpen && (
              <DeleteWarning
                isOpen={isDeleteOpen}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                itemName={itemToDelete?.name}
              />
            )}
            <Button
              color={buttonText}
              bg={buttonBg}
              size="md"
              onClick={() => handleDeleteClick()}
              mt={4}
            >
              Clear Cart
            </Button>
          </VStack>

          {/* Cart Summary */}
          <Box
            flex={isLargerThanMd ? 1 : "100%"}
            w={isLargerThanMd ? "35%" : "100%"}
            bg="white"
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
            divideY={"2px"}
          >
            <Heading as="h2" size="md" mb={4} color={textColor}>
              CART SUMMARY
            </Heading>
            <VStack align="stretch" gap={2}>
              <Flex justify="space-between">
                <Text color={textColor}>Subtotal</Text>
                <Text fontWeight="bold" color={textColor}>
                  KSh {getCartTotal().toFixed(2)}
                </Text>
              </Flex>
            </VStack>
            <Button
              color={buttonText}
              bg={buttonBg}
              mt={6}
              w="100%"
              onClick={() => navigate("/checkout")}
            >
              Checkout (KSh {getCartTotal().toFixed(2)})
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Cart;
