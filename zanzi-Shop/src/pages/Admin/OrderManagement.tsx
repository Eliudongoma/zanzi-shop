import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Table,
  useDisclosure,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "../../components/ui/dialog";
import useFetchOrders from "../../hooks/FetchData/useFetchOrders";
import { Order } from "../../types";
import { orderService } from "../../services/apiServices";
import { CiViewList } from "react-icons/ci"; // View icon
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Tooltip } from "../../components/ui/tooltip";
import AppError from "../../components/AppError";
import Loading from "../../components/Loading";
import SelectItems from "../../components/SelectItems";
import { useCustomColor } from "../../hooks/useCustomColor";


type OrderStatus = "pending" | "processing" | "shipped" | "delivered";
const OrderManagement = () => {
  const { data: orders, loading, fetchData, error } = useFetchOrders();
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
  const {textColor} = useCustomColor();

  // Handle viewing order details
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    onOpen();
  };
  const orderStatus = createListCollection({
    items: [
      { value: "pending", label: "Pending" },
      { value: "processing", label: "Processing" },
      { value: "shipped", label: "Shipped" },
      { value: "delivered", label: "Delivered" },
    ],
  });

  // Handle status update
  const handleStatusUpdate = async (_Id: string, newStatus: OrderStatus) => {
    try {
      const response = await orderService.update(_Id, {
        status: newStatus,
      });
      toast.success(response.message);
      fetchData(); // Refresh orders
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update status");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !isInitialFetchDone) {
        console.log("Fetching orders due to auth state change...");
        fetchData().then(() => setIsInitialFetchDone(true));
      }
    });
    return () => unsubscribe();
  }, [fetchData, isInitialFetchDone]);

  if (loading) {
    return <Loading message="Loading orders..." />;
  }

  if (error) {
    return <AppError error={error} onRetry={fetchData} />;
  }

  return (
    <Box p={4} divideY={"1px"}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Order Management
      </Text>

      {/* Orders Table */}
      <Table.Root variant="line">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Order ID</Table.ColumnHeader>
            <Table.ColumnHeader>Customer Name</Table.ColumnHeader>
            <Table.ColumnHeader>Total (KSH)</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Created At</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order) => (
            <Table.Row key={order._id || order.createdAt.toString()}>
              <Table.Cell>{order._id}</Table.Cell>
              <Table.Cell>{order.shippingDetails.fullName}</Table.Cell>
              <Table.Cell>{order.total.toLocaleString()}</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>
                {new Date(order.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <HStack>
                  <Tooltip showArrow content="View Details">
                    <CiViewList
                      size="25px"
                      cursor="pointer"
                      onClick={() => handleViewDetails(order)}
                    />
                  </Tooltip>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Order Details Dialog */}
      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent style={{ maxHeight: "80vh", overflow: "auto" }} color={textColor}>
          <DialogHeader fontWeight={"bold"}>Order Details</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody
            style={{ maxHeight: "60vh", overflow: "auto", padding: "1rem" }}
          >
            {selectedOrder && (
              <VStack align="stretch" gap={4}>
                {/* Order Summary */}
                <Box>
                  <Text fontWeight="bold">Order ID:</Text>
                  <Text>{selectedOrder._id}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Total:</Text>
                  <Text>KSH {selectedOrder.total.toLocaleString()}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Status:</Text>
                  <SelectItems
                    collections={orderStatus}
                    value={selectedOrder.status}
                    onchange={(value) => {
                      handleStatusUpdate(selectedOrder._id!, value as OrderStatus);
                    }}
                  />
                </Box>
                <Box>
                  <Text fontWeight="bold">Created At:</Text>
                  <Text>
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </Text>
                </Box>

                {/* Shipping Details */}
                <Box  >
                  <Text fontWeight="bold" mb={2}>
                    Shipping Details:
                  </Text>
                  <VStack align="start" gap={1}>
                    <Text>Name: {selectedOrder.shippingDetails.fullName}</Text>
                    <Text>Email: {selectedOrder.shippingDetails.email}</Text>
                    <Text>
                      Address: {selectedOrder.shippingDetails.address}
                    </Text>
                    <Text>City: {selectedOrder.shippingDetails.city}</Text>
                    <Text>
                      Phone: {selectedOrder.shippingDetails.phoneNumber}
                    </Text>
                    <Text>
                      Payment: {selectedOrder.shippingDetails.paymentMethod}
                    </Text>
                  </VStack>
                </Box>

                {/* Cart Items */}
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Cart Items:
                  </Text>
                  <Table.Root variant="line">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Item Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Price (KSH)</Table.ColumnHeader>
                        <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader>Total (KSH)</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {selectedOrder.cartItems.map((item) => (
                        <Table.Row key={item._id}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.price.toLocaleString()}</Table.Cell>
                          <Table.Cell>{item.quantity}</Table.Cell>
                          <Table.Cell>
                            {(item.price * item.quantity).toLocaleString()}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </VStack>
            )}
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default OrderManagement;
