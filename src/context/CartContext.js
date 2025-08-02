import { createContext, useContext, useState, useEffect } from "react";
import { fetchCartCount, fetchCartItems } from "../api/cartAPI";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateCartCount = async () => {
    try {
      const res = await fetchCartCount();
      setCartCount(res.data.count || 0);
    } catch (err) {
      console.error("Failed to fetch cart count", err);
    }
  };

  const updateCartItems = async () => {
    try {
      const res = await fetchCartItems();
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error("Failed to fetch cart items", err);
    }
  };

  useEffect(() => {
    updateCartItems();
    updateCartCount();
  }, []);

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
