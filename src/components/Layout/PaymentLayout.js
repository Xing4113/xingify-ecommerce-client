import PaymentHeader from "../PlaceOrder/PaymentHeader/PaymentHeader";

const PaymentLayout = ({ children }) => {
  return (
    <>
      <PaymentHeader />
      <main>{children}</main>
    </>
  );
};

export default PaymentLayout;
