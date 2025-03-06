import { z } from "zod";

const RegisterSchema = z.object({
  firebaseUid:z.string(),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{10}$/.test(val),
      "Phone number must be 10 digits if provided"
    ),
    registeredAt:z.date(),
    role: z.enum(['user', 'admin'])
});

export default RegisterSchema;
