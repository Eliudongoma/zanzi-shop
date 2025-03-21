import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Divider,
  Badge,
  Table,
} from "@chakra-ui/react";
import { orderService } from "../../services/apiServices"; // Adjust path
import { Order } from "../../types"; // Adjust path
import toast from "react-hot-toast";
import axios from "axios";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // Optional for guest verification
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      toast.error("Please enter an order ID");
      return;
    }

    setIsLoading(true);
    try {
      // Fetch order by ID (and optionally email for verification)
      const response = await orderService.getById(orderId);
      const fetchedOrder = response.data;

      // Optional: Verify email if provided
      if (email && fetchedOrder.shippingDetails.email !== email) {
        toast.error("Email does not match the order");
        return;
      }

      setOrder(fetchedOrder);
      toast.success("Order found!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Order not found");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="800px"
      mx="auto"
      mt={10}
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      border="1px"
      borderColor="gray.200"
    >
      <VStack gap={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="teal.600">
          Track Your Order
        </Heading>
        <Text textAlign="center" color="gray.600">
          Enter your order ID to check the status of your order.
        </Text>

        {/* Tracking Form */}
        <VStack gap={4} as="form" onSubmit={(e) => { e.preventDefault(); handleTrackOrder(); }}>
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.700">
              Order ID
            </FormLabel>
            <Input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., 67db7b26a519b9c2729b4c21"
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.700">
              Email (Optional)
            </FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., your@email.com"
              size="lg"
              type="email"
            />
            <Text fontSize="sm" color="gray.500" mt={1}>
              Enter the email used for the order for added security.
            </Text>
          </FormControl>
          <Button
            colorScheme="teal"
            size="lg"
            loading={isLoading}
            onClick={handleTrackOrder}
            width="full"
          >
            Track Order
          </Button>
        </VStack>

        {/* Order Details */}
        {order && (
          <>
            <Divider my={4} />
            <VStack gap={4} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                  Order ID: {order._id}
                </Text>
                <Badge
                  colorScheme={
                    order.status === "delivered"
                      ? "green"
                      : order.status === "shipped"
                      ? "blue"
                      : order.status === "processing"
                      ? "yellow"
                      : "gray"
                  }
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </HStack>

              <Box>
                <Text fontWeight="bold" color="gray.700" mb={2}>
                  Shipping Details
                </Text>
                <VStack align="start" gap={1} color="gray.600">
                  <Text>{order.shippingDetails.fullName}</Text>
                  <Text>{order.shippingDetails.email}</Text>
                  <Text>{order.shippingDetails.address}, {order.shippingDetails.city}</Text>
                  <Text>{order.shippingDetails.phoneNumber}</Text>
                  <Text>Payment: {order.shippingDetails.paymentMethod}</Text>
                </VStack>
              </Box>

              <Box>
                <Text fontWeight="bold" color="gray.700" mb={2}>
                  Order Items
                </Text>
                <Table.Root variant="simple" size="sm">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Item</Table.ColumnHeader>
                      <Table.ColumnHeader>Price (KSH)</Table.ColumnHeader>
                      <Table.ColumnHeader>Qty</Table.ColumnHeader>
                      <Table.ColumnHeader>Total (KSH)</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {order.cartItems.map((item) => (
                      <Table.Row key={item._id}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.price.toLocaleString()}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell>{(item.price * item.quantity).toLocaleString()}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>

              <Box>
                <Text fontWeight="bold" color="gray.700">
                  Total: KSH {order.total.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </Text>
              </Box>
            </VStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default OrderTracking;