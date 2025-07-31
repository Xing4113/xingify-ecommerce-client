import "../../styles/pages/payment/LegalPage.scss";

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <h2>Terms of Service</h2>
      <p>
        This website is a demo e-commerce platform built for portfolio purposes
        only. No real products are being sold or delivered. By accessing or
        using this site, you agree to abide by these Terms.
      </p>

      <ul>
        <li>All content is for demonstration purposes only.</li>
        <li>There are no real transactions or deliveries.</li>
        <li>
          User data is not stored, shared, or used beyond demonstration scope.
        </li>
      </ul>
    </div>
  );
};

export default TermsOfService;
