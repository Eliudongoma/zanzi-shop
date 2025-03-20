import { z } from "zod";

export const OrderSchema = z.object({
  shippingDetails: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(3, "Address is required"),
    city: z.string().min(1, "City is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    paymentMethod: z.enum(["mpesa", "cash"]),
  }),
  cartItems: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      price: z.number().min(0, "Price cannot be negative"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ),
  total: z.number().min(1, "Total must be at least 1"),
  userId: z.string().optional(),
  createdAt: z.date(),
  status: z.enum(["pending", "processing", "shipped", "delivered"]).default("pending"), // Default set here
});

export type Order = z.infer<typeof OrderSchema>; // Export inferred type if needed