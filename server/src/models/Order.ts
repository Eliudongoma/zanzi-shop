import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  phoneNumber: string;
  paymentMethod: "mpesa" | "cash";
}

interface Order extends Document {
  shippingDetails: ShippingDetails;
  cartItems: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  userId?: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  shippingDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    paymentMethod: { type: String, enum: ["mpesa", "cash"], required: true },
  },
  cartItems: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  userId: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);