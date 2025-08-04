import { createContext, useContext, useState, useEffect } from "react";
import { fetchCartCount, fetchCartItems } from "../api/cartAPI";
import { useUser } from "../context/UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateCartCount = async () => {
    try {
      const res = await fetchCartCount();
      setCartCount(res.data.count || 0);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to fetch cart count", err);
      }
    }
  };

  const updateCartItems = async () => {
    try {
      const res = await fetchCartItems();
      setCartItems(res.data.cart || []);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to fetch cart items", err);
      }
    }
  };

  useEffect(() => {
    if (user) {
      updateCartCount();
      updateCartItems();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        setCartItems,
        updateCartCount,
        updateCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
