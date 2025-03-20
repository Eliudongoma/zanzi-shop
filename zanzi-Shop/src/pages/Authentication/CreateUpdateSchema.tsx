// In RegisterSchema.js or similar file
import * as z from 'zod';

// Base schema with common fields
const baseUserSchema = z.object({
  _id: z.string().optional(),
  firebaseUID: z.string().min(1, "Required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  role: z.enum(["admin", "user"]),
  registeredAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().default(() => new Date()))
});

// Schema for creating new users (includes password)
export const CreateUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters")
});

// Schema for updating users (password is optional)
export const UpdateUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters").optional()
});

export default CreateUserSchema;
