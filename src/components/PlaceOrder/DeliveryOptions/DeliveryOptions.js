import { useState } from "react";
import "./DeliveryOptions.scss";

const DeliveryOptions = ({ selectedOption, onChange }) => {
  const getArrivalDateRange = (minOffset, maxOffset) => {
    const now = new Date();
    const formatDate = (offset) => {
      const date = new Date(now);
      date.setDate(date.getDate() + offset);
      return date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };
    return `${formatDate(minOffset)} - ${formatDate(maxOffset)}`;
  };

  return (
    <div className="delivery_option_container">
      <div
        className={`delivery-option ${
          selectedOption === "standard" ? "selected" : ""
        }`}
        onClick={() => onChange("standard")}
      >
        <div className="option-title">Standard Delivery</div>
        <div className="option-subtext">
          Arrives between {getArrivalDateRange(3, 4)}{" "}
          <span className="delivery-price">Free</span>
        </div>
      </div>

      <div
        className={`delivery-option ${
          selectedOption === "express" ? "selected" : ""
        }`}
        onClick={() => onChange("express")}
      >
        <div className="option-title">Express Delivery</div>
        <div className="option-subtext">
          Arrives between {getArrivalDateRange(1, 5)}{" "}
          <span className="delivery-price">$10.00</span>
        </div>
      </div>

      <div className="break-line"></div>
    </div>
  );
};

export default DeliveryOptions;
