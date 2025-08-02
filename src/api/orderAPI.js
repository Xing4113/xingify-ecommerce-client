import api from "./axiosInstance";

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
