import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getStripeSession, cancelOrderRequest } from "../../api/orderAPI";
import "../../styles/pages/payment/PaymentCancel.scss";
import { useModal } from "../../context/ModalContext";

const PaymentCancel = () => {
  const { showModal, hideModal } = useModal();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    const cancelOrder = async () => {
      showModal("loading");

      try {
        const { data: session } = await getStripeSession(sessionId);

        const metadata = session.metadata;

        await cancelOrderRequest({
          order_id: metadata.order_id,
          order_no: metadata.order_no,
        });
      } catch (err) {
        console.error("Failed to cancel order:", err);
        window.location.href = "/cart";
      } finally {
        hideModal();
      }
    };

    if (sessionId && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      cancelOrder();
    }
  }, []);

  return (
    <div className="payment-cancel-page">
      <div className="cancel-card">
        <h2 className="title">Payment Cancelled!</h2>
        <p className="cancel-msg">
          Your payment was not completed. No charges were made.
        </p>
        <p className="sub-msg">
          You can return to your cart to review your items or try again later.
        </p>
        <button onClick={() => navigate("/cart")} className="return-btn">
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
