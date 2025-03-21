import React from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Text,
  Fieldset,
  HStack,
  useMediaQuery,
  createListCollection,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema } from "../Schemas/OrderSchema"; // Updated import
import { useCustomColor } from "../hooks/useCustomColor";
import { useCart } from "../hooks/useCart";
import SelectItems from "../components/SelectItems";
import FormField from "../components/FormField";
import { Order } from "../types"; // Updated import
import axios from "axios";
import { orderService } from "../services/apiServices";

const CheckoutPage: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
  } = useForm<Order>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      shippingDetails: {
        fullName: "",
        email: "",
        address: "",
        city: "",
        phoneNumber: "",
        paymentMethod: "cash", // Default value
      },
      cartItems: [], // Will be populated dynamically
      total: 0, // Will be calculated
      status: "pending", // Default value
      userId: undefined,
      createdAt: new Date(),
    },
  });

  const navigate = useNavigate();
  const { buttonText, buttonBg, textColor, bgColor } = useCustomColor();
  const { cart, getCartTotal, clearCart } = useCart();
  const paymentMethods = createListCollection({
    items: [
      { value: "mpesa", label: "Mpesa" },
      { value: "cash", label: "Cash" },
    ],
  });
  const [isLargerThanMd] = useMediaQuery(["(min-width: 768px)"], {
    ssr: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  console.log("Form errors:", errors);
  const subtotal = getCartTotal();
  const shipping = 5; // Static for now
  const total = subtotal + shipping;
  setValue('total', total);

//   console.log('Total value type:', typeof total);
// console.log('Total value:', total);
  const handleCheckout = async (data: Order) => {
    console.log("Checking out");
    setIsLoading(true);
    try {
      const orderData: Order = {
        ...data,
        cartItems: cart, // Use cart from useCart
        total, // Calculated total
        status: "pending", // Explicitly set to pending
        createdAt: new Date(), // Current timestamp
      };

      const response = await orderService.create(orderData);
      toast.success(response.message || "Order placed successfully!", {
        duration: 3000,
      });
      clearCart();
      navigate("/order-confirmation", { state: { order: response.data } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to place order. Please try again."
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="container.lg"
      mx="auto"
      color={textColor}
      bg={bgColor}
      p={{ base: 4, md: 6 }}
      boxShadow="md"
      borderRadius="lg"
    >
      <Heading mb={6} textAlign="center" size="lg" color={textColor}>
        Checkout
      </Heading>
      {cart.length === 0 ? (
        <Text textAlign="center">
          Your cart is empty. Add items to proceed.
        </Text>
      ) : (
        <form onSubmit={handleSubmit(handleCheckout)}>
          <Flex
            direction={isLargerThanMd ? "row" : "column"}
            gap={6}
            justify="space-between"
          >
            <VStack
              flex={2}
              gap={6}
              align="stretch"
              p={4}
              bg={bgColor}
              borderRadius="md"
              boxShadow="sm"
            >
              <Heading size="md" color={textColor}>
                Shipping Details
              </Heading>
              <Fieldset.Root>
                <VStack gap={4}>
                  <FormField
                    label="Full Name"
                    name="shippingDetails.fullName"
                    register={register}
                    error={errors.shippingDetails?.fullName}
                  />
                  <FormField
                    label="Email"
                    name="shippingDetails.email"
                    register={register}
                    error={errors.shippingDetails?.email}
                  />
                  <FormField
                    label="Address"
                    name="shippingDetails.address"
                    register={register}
                    error={errors.shippingDetails?.address}
                  />
                  <FormField
                    label="City"
                    name="shippingDetails.city"
                    register={register}
                    error={errors.shippingDetails?.city}
                  />
                  <FormField
                    label="Phone Number"
                    name="shippingDetails.phoneNumber"
                    register={register}
                    error={errors.shippingDetails?.phoneNumber}
                  />
                </VStack>
              </Fieldset.Root>

              <Heading size="md" color={textColor} mt={4}>
                Payment Method
              </Heading>
              <Fieldset.Root>
                <FormField
                  name="shippingDetails.paymentMethod"
                  register={register}
                  error={errors.shippingDetails?.paymentMethod}
                  component="custom"
                >
                  <SelectItems
                    collections={paymentMethods}
                    value={
                      watch("shippingDetails.paymentMethod")
                    }
                    onchange={(value) =>
                      setValue(
                        "shippingDetails.paymentMethod",
                        (value[0] as "cash" | "mpesa") || ""
                      )
                    }
                  />
                </FormField>
              </Fieldset.Root>
            </VStack>

            <VStack
              flex={1}
              gap={4}
              align="stretch"
              p={4}
              bg={bgColor}
              borderRadius="md"
              boxShadow="sm"
            >
              <Heading size="md" color={textColor}>
                Order Summary
              </Heading>
              {cart.map((item) => (
                <HStack key={item._id} justify="space-between">
                  <Text>
                    {item.name} (x{item.quantity})
                  </Text>
                  <Text>ksh {(item.price * item.quantity).toFixed(2)}</Text>
                </HStack>
              ))}
              <HStack justify="space-between">
                <Text>Subtotal:</Text>
                <Text fontWeight="semibold">ksh {subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Shipping:</Text>
                <Text fontWeight="semibold">ksh {shipping.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between" fontWeight="bold">
                <Text>Total:</Text>
                <Text>ksh {total.toFixed(2)}</Text>
              </HStack>
              <Button
                type="submit"
                // onClick={() => handleCheckout}
                color={buttonText}
                bg={buttonBg}
                width="full"
                mt={4}
                _hover={{ opacity: 0.9 }}
                loading={isLoading}
                loadingText="Processing..."
                disabled={cart.length === 0}
              >
                Place Order
              </Button>
            </VStack>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default CheckoutPage;
