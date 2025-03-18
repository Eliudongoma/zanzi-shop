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
  _id: string;
  firebaseUid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  registeredAt: Date
  role: 'user' | 'admin';
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
export interface ShippingDetails{
  fullName: string;
  email: string;
  address: string;
  city: string;
  phoneNumber: string;
  paymentMethod: string;
}