import React, { useState } from "react";
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
import { ShippingDetails } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import ShippingSchema from "../Schemas/ShippingSchema"; // Fixed typo
import { useCustomColor } from "../hooks/useCustomColor";
import { useCart } from "../hooks/useCart"; // Import your useCart hook
import SelectItems from "../components/SelectItems";
import FormField from "../components/FormField";

const CheckoutPage: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
  } = useForm<ShippingDetails>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      phoneNumber: "",
      paymentMethod: "",
    },
  });

  const navigate = useNavigate();
  const { buttonText, buttonBg, textColor, bgColor } = useCustomColor();
  const { cart, getCartTotal, clearCart } = useCart(); // Use the cart hook
  const paymentMethods = createListCollection({
    items: [
      { value: "mpesa", label: "Mpesa" },
      { value: "cash", label: "Cash" },
    ],
  });
  const [isLargerThanMd] = useMediaQuery(["(min-width: 768px)"], { ssr: false });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = 50; // Static for now, could be dynamic based on logic
  const total = subtotal + shipping;

  const handleCheckout = async (data: ShippingDetails) => {
    setIsLoading(true);
    try {
      // Simulate an API call to place the order
      const orderData = {
        shippingDetails: data,
        cartItems: cart,
        total,
      };
      console.log("Order Data:", orderData); // Replace with actual API call

      // Simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      toast.success("Order placed successfully!", { duration: 3000 });

      // Clear cart after successful order
      await clearCart();
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
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
        <Text textAlign="center">Your cart is empty. Add items to proceed.</Text>
      ) : (
        <form onSubmit={handleSubmit(handleCheckout)}>
          <Flex
            direction={isLargerThanMd ? "row" : "column"}
            gap={6}
            justify="space-between"
          >
            {/* Shipping & Payment Details */}
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
                    name="fullName"
                    register={register}
                    error={errors.fullName}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    register={register}
                    error={errors.email}
                  />
                  <FormField
                    label="Address"
                    name="address"
                    register={register}
                    error={errors.address}
                  />
                  <FormField
                    label="City"
                    name="city"
                    register={register}
                    error={errors.city}
                  />
                  <FormField
                    label="Phone Number"
                    name="phoneNumber"
                    register={register}
                    error={errors.phoneNumber}
                  />
                </VStack>
              </Fieldset.Root>

              <Heading size="md" color={textColor} mt={4}>
                Payment Method
              </Heading>
              <Fieldset.Root>
                <FormField
                  name="paymentMethod"
                  register={register}
                  error={errors.paymentMethod}
                  component="custom"
                >
                  <SelectItems
                    collections={paymentMethods}
                    value={watch("paymentMethod") ? [watch("paymentMethod")] : []}
                    onchange={(value) => setValue("paymentMethod", value[0] || "")}
                  />
                </FormField>
              </Fieldset.Root>
            </VStack>

            {/* Order Summary */}
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
                  <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                </HStack>
              ))}
              <HStack justify="space-between">
                <Text>Subtotal:</Text>
                <Text fontWeight="semibold">${subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Shipping:</Text>
                <Text fontWeight="semibold">${shipping.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between" fontWeight="bold">
                <Text>Total:</Text>
                <Text>${total.toFixed(2)}</Text>
              </HStack>
              <Button
                color={buttonText}
                bg={buttonBg}
                type="submit"
                width="full"
                mt={4}
                _hover={{ opacity: 0.9 }}
                loading={isLoading}
                loadingText="Processing"
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