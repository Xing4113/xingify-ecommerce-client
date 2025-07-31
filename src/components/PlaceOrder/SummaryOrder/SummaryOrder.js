import React from "react";
import "./SummaryOrder.scss";

const SummaryOrder = ({
  cartItems,
  deliveryOption,
  deliveryCharge,
  finalTotal,
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <div className="summary-order-container">
      {cartItems.map((item) => (
        <div className="summary-item" key={item.id}>
          <div className="item-image-wrapper">
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="item-image"
            />
            <span className="quantity-badge">{item.quantity}</span>
          </div>
          <div className="item-info">
            <div className="item-name">
              {item.product.name}
              <br />({item.color}, US{item.size})
            </div>

            <div className="item-price">
              ${(item.quantity * item.product.price).toFixed(2)}
            </div>
          </div>
        </div>
      ))}

      <div className="break-line"></div>

      <div className="summary-price-container">
        <div className="summary-price-display">
          <div>Subtotal</div>
          <div>${subtotal.toFixed(2)}</div>
        </div>

        <div className="summary-price-display">
          <div>
            Delivery ({deliveryOption === "express" ? "Express" : "Standard"})
          </div>
          <div>
            {deliveryCharge > 0 ? `$${deliveryCharge.toFixed(2)}` : "Free"}
          </div>
        </div>

        <div className="break-line"></div>

        <div className="summary-price-display">
          <div className="summary-total-text">Total</div>
          <div className="summary-total-price">
            (SGD) ${finalTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryOrder;
