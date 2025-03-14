import { useEffect, useState } from "react";
import { CartItem, Product } from "../../types";
import { CartContext } from "./CartContext";
import { useAuthState } from "../../hooks/useAuthState";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuthState();

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCart(cartSnap.data().prevItems || []);
        } else {
          const guestCart = localStorage.getItem("guestCart");
          const initialCart = guestCart ? JSON.parse(guestCart) : [];
          await setDoc(cartRef, { prevItems: initialCart });
          setCart(initialCart);
          if (guestCart) localStorage.removeItem("guestCart");
        }
      } else {
        const guestCart = localStorage.getItem("guestCart");
        setCart(guestCart ? JSON.parse(guestCart) : []);
      }
    };
    loadCart().catch(console.error);
  }, [user]);

  const saveCart = async (newCart: CartItem[]) => {
    if (user) {
      await setDoc(
        doc(db, "carts", user.uid),
        { items: newCart },
        { merge: true }
      );
    } else {
      localStorage.setItem("guestCart", JSON.stringify(newCart));
    }
    setCart(newCart);
  };
  const addToCart = async (item: Product) => {
    const newCart = [...cart];
    const existingItem = newCart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + 1, 99);
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    await saveCart(newCart);
  };

  const removeFromCart = async (productId: string) => {
    const newCart = cart.filter((item) => item._id !== productId);
    await saveCart(newCart)
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const newCart = cart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, 99)) }
          : item
      );
      await saveCart(newCart);
  };

  const clearCart = async() => await saveCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        getCartTotal,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
