import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateCartCount = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart/countCart", {
        credentials: "include",
      });
      const data = await res.json();
      setCartCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch cart count", err);
    }
  };

  const updateCartItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart", {
        credentials: "include",
      });
      const data = await res.json();
      setCartItems(data.cart || []);
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
