import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Button,
  Container,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useCustomColor } from "../hooks/useCustomColor"; // Assuming you have this
import { Order } from "../types";

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const order: Order = location.state?.order;
  const { buttonText, buttonBg, textColor, bgColor } = useCustomColor();

  if (!order) {
    return (
      <Container maxW="container.md" py={10}>
        <Text textAlign="center" color="red.500">
          No order details found. Please try placing your order again.
        </Text>
      </Container>
    );
  }

  const statusColor =
    order.status === "pending"
      ? "yellow"
      : order.status === "processing"
      ? "blue"
      : order.status === "shipped"
      ? "orange"
      : "green";

  return (
    <Container maxW="container.md" py={10}>
      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        boxShadow="xl"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Flex direction="column" align="center" mb={6}>
          <Icon as={CheckCircleIcon} w={12} h={12} color="green.500" mb={4} />
          <Heading size="xl" color={textColor} textAlign="center">
            Order Confirmed!
          </Heading>
          <Text fontSize="lg" color="gray.500" mt={2}>
            Thank you for your purchase.
          </Text>
        </Flex>

        <VStack gap={4} align="stretch" divideY={"2px"}>
          <HStack justify="space-between">
            <Text fontWeight="bold">Order ID:</Text>
            <Text>{order._id}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontWeight="bold">Total:</Text>
            <Text fontWeight="bold" color="green.500">
              ksh {order.total.toFixed(2)}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontWeight="bold">Status:</Text>
            <Badge colorScheme={statusColor} fontSize="sm" px={2} py={1}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </HStack>

          <Box>
            <Text fontWeight="bold" mb={2}>
              Shipping Details:
            </Text>
            <VStack align="start" gap={1} fontSize="sm" color="gray.600">
              <Text>{order.shippingDetails.fullName}</Text>
              <Text>{order.shippingDetails.email}</Text>
              <Text>{order.shippingDetails.address}</Text>
              <Text>{order.shippingDetails.city}</Text>
              <Text>{order.shippingDetails.phoneNumber}</Text>
              <Text>Payment: {order.shippingDetails.paymentMethod}</Text>
            </VStack>
          </Box>

          <Box divideX={"1px"}>
            <Text fontWeight="bold" mb={2}>
              Items Ordered:
            </Text>
            {order.cartItems.map((item) => (
              <HStack key={item._id} justify="space-between" fontSize="sm">
                <Text>
                  {item.name} (x{item.quantity})
                </Text>
                <Text>ksh {(item.price * item.quantity).toFixed(2)}</Text>
              </HStack>
            ))}
          </Box>
        </VStack>

        <Button
          mt={6}
          width="full"
          color={buttonText}
          bg={buttonBg}
          _hover={{ opacity: 0.9 }}
          onClick={() => window.location.href = "/"} // Redirect to home
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;