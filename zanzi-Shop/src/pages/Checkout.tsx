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
import { ShippingDetails } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import ShippingSchema from "../Schemas/ShippingSchema"; // Typo: Should be "ShippingSchema"
import { useCustomColor } from "../hooks/useCustomColor";
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
  const paymentMethods = createListCollection({
    items: [
      { value: "mpesa", label: "Mpesa" },
      { value: "cash", label: "Cash" },
    ],
  });
  const [isLargerThanMd] = useMediaQuery(["(min-width: 768px)"], { ssr: false });

  const handleCheckout = (data: ShippingDetails) => {
    toast.success("Order placed successfully!", { duration: 3000 });
    console.log("Shipping Details:", data); // For debugging
    navigate("/");
  };

  return (
    <Box
      maxW="container.lg" // Slightly larger container for better gap
      mx="auto"
      color={textColor}
      bg={bgColor}
      p={{ base: 4, md: 6 }} // Responsive padding
      boxShadow="md" // Softer shadow for a modern look
      borderRadius="lg" // Larger radius for consistency
    >
      <Heading mb={6} textAlign="center" size="lg" color={textColor}>
        Checkout
      </Heading>
      <form onSubmit={handleSubmit(handleCheckout)}>
        <Flex
          direction={isLargerThanMd ? "row" : "column"}
          gap={6} // Increased gap for better separation
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
            <HStack justify="space-between">
              <Text>Subtotal:</Text>
              <Text fontWeight="semibold">$100</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Shipping:</Text>
              <Text fontWeight="semibold">$5</Text>
            </HStack>
            <HStack justify="space-between" fontWeight="bold">
              <Text>Total:</Text>
              <Text>$105</Text>
            </HStack>
            <Button
              color={buttonText}
              bg={buttonBg}
              type="submit"
              width="full"
              mt={4}
              _hover={{ opacity: 0.9 }} // Subtle hover effect
            >
              Place Order
            </Button>
          </VStack>
        </Flex>
      </form>
    </Box>
  );
};

export default CheckoutPage;