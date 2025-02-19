import { useState } from "react";
import { CartItem, Product } from "../../types";
import { CartContext } from "./CartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((preItems) => preItems.filter((item) => item._id !== productId));
  };
  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
    });
  };
  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
