import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    _id:{type: String, required: true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
