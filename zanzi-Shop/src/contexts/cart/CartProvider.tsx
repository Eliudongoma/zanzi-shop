import { useState } from "react";
import { CartItem, Product } from "../../types";
import { CartContext } from "./CartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (product: Product) => {
    setCart((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.min( item.quantity + 1, 99)}
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevItems) => prevItems.filter((item) => item._id !== productId));
  };
  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevItems) => {
      return prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, 99)) } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total+item.price * item.quantity,0)
  }
  return (
    <CartContext.Provider
      value={{cart, addToCart,clearCart, getCartTotal, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
