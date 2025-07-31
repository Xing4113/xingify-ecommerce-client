import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../../assets/icons/logo-rm.svg";
import "./PaymentHeader.scss";

const PaymentHeader = () => {
  return (
    <header className="payment-header">
      <div className="payment-header-container">
        <Link to="/">
          <LogoIcon className="payment-logo" />
        </Link>
      </div>
    </header>
  );
};

export default PaymentHeader;
