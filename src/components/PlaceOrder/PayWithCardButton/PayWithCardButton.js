import "./PayWithCardButton.scss";

const PayWithCardButton = ({ onClick, disabled }) => {
  return (
    <div className="pay-with-card-container">
      <button onClick={onClick} className="pay-btn" disabled={disabled}>
        Pay With Card
      </button>

      <p className="legal-disclaimer">
        Your info will be saved to a Shop account. By continuing, you agree to
        Shop's{" "}
        <a
          href="/payment/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>{" "}
        and acknowledge the{" "}
        <a
          href="/payment/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        .
      </p>

      <hr />

      <div className="policy-links">
        <a
          href="/payment/refund-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Refund policy
        </a>
        <a
          href="/payment/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy policy
        </a>
        <a
          href="/payment/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of service
        </a>
      </div>

      <p className="final-legal">
        By placing this order, you agree to our{" "}
        <a href="/payment/terms" target="_blank" rel="noopener noreferrer">
          Terms
        </a>{" "}
        and understand our{" "}
        <a
          href="/payment/privacy-cookies"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy & Cookies Policy
        </a>
        .
      </p>
    </div>
  );
};

export default PayWithCardButton;
