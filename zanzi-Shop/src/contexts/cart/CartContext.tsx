import { createContext } from "react";
import { CartItem, Product } from "../../types";

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

