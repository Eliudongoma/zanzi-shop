import { z } from "zod";

const ProductSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price must be greater than 0")
  ),
  weight: z.string().min(1,"Weight is Required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().min(1, "Upload Image"),
  stock: z.coerce.number().positive("Stock should be greater than one(1)"),
});

export default ProductSchema;
