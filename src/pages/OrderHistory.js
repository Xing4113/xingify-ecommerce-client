import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import "../styles/pages/OrderHistory.scss";
import OrderCard from "../components/ViewOrder/OrderCard/OrderCard";
import { useModal } from "../context/ModalContext";

function OrderHistory() {
  const { showModal, hideModal } = useModal();
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      showModal("loading");
      try {
        const res = await axios.get(
          "http://localhost:5000/order/orderHistory",
          { withCredentials: true }
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        hideModal();
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const cancelOrder = async (order_id, order_no) => {
    showModal("warning", "Are you sure you want to cancel Order?", async () => {
      showModal("loading");
      try {
        const res = await axios.patch(
          "http://localhost:5000/order/cancelUserOrder",
          {
            order_id,
            order_no,
          },
          { withCredentials: true }
        );
        if (res.data.success) {
          setOrders((prev) =>
            prev.map((o) =>
              o.order_id === order_id ? { ...o, status: "cancelled" } : o
            )
          );

          showModal("success", "Order cancelled.");
        }
      } catch (err) {
        console.error("Cancel failed:", err);
        showModal("error", "Please try again later.");
      }
    });
  };

  const confirmReceived = async (order_id, order_no) => {
    showModal("loading");

    try {
      const res = await axios.patch(
        "http://localhost:5000/order/confirmOrderReceived",
        {
          order_id,
          order_no,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.order_id === order_id
              ? { ...o, status: "completed", complete_dt: new Date() }
              : o
          )
        );
      }
    } catch (err) {
      console.error("Failed to confirm order received:", err);
    } finally {
      hideModal();
    }
  };

  return (
    <div className="order-history-page mt-space">
      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <OrderCard
              key={order.order_id}
              order={order}
              onCancel={cancelOrder}
              onConfirmReceived={confirmReceived}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
