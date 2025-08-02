import api from "./axiosInstance";

// Get user's order history
export const fetchOrderHistory = () => {
  return api.get("/order/orderHistory");
};

// prepare the order
export const prepareOrder = (orderData) => {
  return api.post("/order/prepare", orderData);
};

// Fetch Stripe session metadata
export const getStripeSession = (sessionId) => {
  return api.get(`/stripe/session/${sessionId}`);
};

// Cancel the order using metadata
export const cancelOrderRequest = ({ order_id, order_no }) => {
  return api.delete("/order/cancelOrder", {
    data: { order_id, order_no },
  });
};

// Confirm (process) order
export const confirmOrder = ({ order_id, order_no }) => {
  return api.put("/order/confirmOrder", {
    order_id,
    order_no,
  });
};

// Cancel an order from user's side
export const cancelUserOrder = ({ order_id, order_no }) => {
  return api.patch("/order/cancelUserOrder", {
    order_id,
    order_no,
  });
};

// Confirm that an order has been received
export const confirmOrderReceived = ({ order_id, order_no }) => {
  return api.patch("/order/confirmOrderReceived", {
    order_id,
    order_no,
  });
};
