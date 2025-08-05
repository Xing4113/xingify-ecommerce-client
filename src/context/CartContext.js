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
      const rawCart = res.data.cart || [];

      const enrichedCart = rawCart.map((item) => {
        const matchedImage = item.product?.images?.find(
          (img) => img.color.toLowerCase() === item.color.toLowerCase()
        );

        const productCopy = { ...item.product }; // prevent direct mutation
        productCopy.imageUrl = matchedImage?.imageUrl || item.product.imageUrl;

        return {
          ...item,
          product: productCopy, // use updated product object
        };
      });

      setCartItems(enrichedCart);
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
