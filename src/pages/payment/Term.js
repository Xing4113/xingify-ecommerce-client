import "../../styles/pages/payment/LegalPage.scss";

const Terms = () => {
  return (
    <div className="legal-page">
      <h2>Terms</h2>
      <p>
        By using this site, you acknowledge that it is a portfolio demonstration
        only. No real goods or services are offered, and no liability is
        assumed.
      </p>

      <ul>
        <li>This site is intended for educational or job-seeking purposes.</li>
        <li>No legal obligations or contracts are formed from its use.</li>
        <li>
          You should not attempt to make purchases or submit real data on this
          site.
        </li>
      </ul>
    </div>
  );
};

export default Terms;
