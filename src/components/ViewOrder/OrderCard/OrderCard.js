import React from "react";
import "./OrderCard.scss";

function OrderCard({ order, onCancel, onConfirmReceived }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <span className="order-no">{order.order_no}</span>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <div className="order-products">
        {order.items?.map((item) => (
          <div key={item.id} className="order-product">
            <div className="product-image">
              <img src={item.product_image} alt={item.name} />
            </div>
            <div className="product-details-container">
              <div className="product-details">
                <p className="product-name">{item.name}</p>
                <p className="product-variant">
                  ({item.color}, US{item.size})
                </p>
                <p className="product-quantity">x{item.quantity}</p>
              </div>
              <div className="product-price">
                ${Number(item.subtotal).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary-container">
        <div className="summary-details">
          <div className="summary-row">
            <span className="summary-label">Delivery Fee</span>
            <span className="summary-value">
              {Number(order.delivery_fee) === 0
                ? "Free"
                : `$${Number(order.delivery_fee).toFixed(2)}`}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Order Total</span>
            <span className="summary-value">
              ${Number(order.total_amount).toFixed(2)}
            </span>
          </div>
          {order.status === "confirmed" && (
            <div className="summary-row">
              <span className="summary-label expected-arrival">
                Expected Arrival
              </span>
              <span className="summary-value">
                {order.expected_date
                  .split(",")
                  .map((d) =>
                    new Date(d).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    })
                  )
                  .join(" – ")}
              </span>
            </div>
          )}

          {order.status === "completed" && (
            <div className="summary-row">
              <span className="summary-label expected-arrival">Arrived On</span>
              <span className="summary-value">
                {new Date(order.arrives_date).toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {order.status === "cancelled" && (
            <div className="summary-row">
              <span className="summary-label expected-arrival">
                Cancelled On
              </span>
              <span className="summary-value">
                {new Date(order.cancel_dt).toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="order-button-container">
        {order.status === "confirmed" && (
          <button
            className="cancel-button"
            onClick={() => onCancel(order.order_id, order.order_no)}
          >
            Cancel Order
          </button>
        )}

        {order.status === "confirmed" && (
          <button
            className="order-receive-button"
            onClick={() => onConfirmReceived(order.order_id, order.order_no)}
          >
            Order Received
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
