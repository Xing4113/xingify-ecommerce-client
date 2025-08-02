import api from "./axiosInstance";

// add item to cart
export const addToCart = ({ productId, color, size }) => {
  return api.post("/cart/add", {
    productId,
    color,
    size,
    quantity: 1,
  });
};

// Get total cart item count
export const fetchCartCount = () => api.get("cart/countCart");

// Get cart items
export const fetchCartItems = () => api.get("cart/");

// Increase item quantity in cart
export const increaseCartItem = (itemId) => {
  return api.patch(`/cart/${itemId}/increase`);
};

// Decrease item quantity in cart
export const decreaseCartItem = (itemId) => {
  return api.patch(`/cart/${itemId}/decrease`);
};

// Delete an item from the cart
export const deleteCartItem = (itemId) => {
  return api.delete(`/cart/${itemId}`);
};

// Get available sizes for a cart item
export const getAvailableSizes = (itemId) => {
  return api.get(`/cart/getInfo/${itemId}`);
};

// Update size of an item in the cart
export const updateCartItemSize = (itemId, newSize) => {
  return api.patch(`/cart/updateSize/${itemId}`, {
    size: newSize,
  });
};
