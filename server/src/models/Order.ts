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
  paymentMethod: string;
}

interface Order extends Document {
  shippingDetails: ShippingDetails;
  cartItems: CartItem[];
  total: number;
  userId?: string; // Optional, for authenticated users
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  shippingDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    paymentMethod: { type: String, required: true, enum: ["mpesa", "cash"] },
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
  userId: { type: String, required: false }, // Optional for guest checkout
  createdAt: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);