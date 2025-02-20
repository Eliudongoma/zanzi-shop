import { z } from "zod";

const ProductSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z.preprocess((val) => Number(val), z.number().min(1, "Price must be greater than 0")),
  weight: z.coerce.number(),
  category: z.string(),
  imageUrl: z.string(),
  stock: z.coerce.number(),
});

export default ProductSchema;
