import { z } from "zod";

const ShippingSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(1, "City is required"),
  phoneNumber: z.string().min(10,"Phone number is invalid"),
  paymentMethod: z.string().min(1, "Payment method is required")
});

export default ShippingSchema;
