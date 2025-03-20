import { UpdateUserSchema, CreateUserSchema } from "./CreateUpdateSchema";

// Export a function that returns the appropriate schema
export default function getRegisterSchema(isUpdating: boolean) {
  return isUpdating ? UpdateUserSchema : CreateUserSchema;
}