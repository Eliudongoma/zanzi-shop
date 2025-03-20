export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  category: string;
  imageUrl: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  _id?: string;
  firebaseUID: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  registeredAt: Date;
  role: "user" | "admin";
}

export interface CartItems {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  phoneNumber: string;
  paymentMethod: "mpesa" | "cash"; // Simplified to match Zod enum
}

export interface Order {
  _id?: string; // Optional for new orders
  shippingDetails: ShippingDetails;
  cartItems: CartItems[]; // Array, not a tuple with one item
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered"; // Simplified to match Zod enum
  userId?: string; // Optional for guest checkout
  createdAt: Date;
}
