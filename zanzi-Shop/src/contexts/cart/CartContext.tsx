import { createContext } from "react";
import { CartItem, Product } from "../../types";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal  : () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

