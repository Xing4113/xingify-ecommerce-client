import "../../styles/pages/payment/LegalPage.scss";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <h2>Privacy Policy</h2>
      <p>
        We value your privacy. This website is a demo e-commerce platform built
        for portfolio purposes only. No real user data is collected, stored, or
        processed.
      </p>

      <ul>
        <li>
          Any information entered is used solely for demonstration purposes.
        </li>
        <li>
          No cookies, analytics, or tracking mechanisms are implemented beyond
          development tools.
        </li>
        <li>
          Your interactions on this site are not persisted or shared with third
          parties.
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
