import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/payment/PaymentSuccess.scss";
import { useModal } from "../../context/ModalContext";

const PaymentSuccess = () => {
  const { showModal, hideModal } = useModal();
  const [searchParams] = useSearchParams();
  const [orderNo, setOrderNo] = useState("");
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    const processOrder = async () => {
      showModal("loading");
      try {
        const { data: session } = await axios.get(
          `http://localhost:5000/stripe/session/${sessionId}`,
          { withCredentials: true }
        );

        const metadata = session.metadata;
        setOrderNo(metadata.order_no);

        await axios.put(
          "http://localhost:5000/order/confirmOrder",
          {
            order_id: metadata.order_id,
            order_no: metadata.order_no,
          },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Failed to process order:", err);
        window.location.href = "/cart";
      } finally {
        hideModal();
      }
    };

    if (sessionId && !hasFetchedRef.current) {
      hasFetchedRef.current = true; // set to true to prevent re-fetch
      processOrder();
    }
  }, []);

  return (
    <div className="payment-success-page">
      <div className="success-card">
        <h2 className="title">Payment Successful!</h2>
        <h3 className="order-no">{orderNo}</h3>

        <p className="success-msg">
          Thank you! Your order has been placed successfully.
        </p>
        <p className="sub-msg">
          We’re now preparing your items and will deliver them shortly.
        </p>

        <button onClick={() => navigate("/orders")} className="continue-btn">
          View Order
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
