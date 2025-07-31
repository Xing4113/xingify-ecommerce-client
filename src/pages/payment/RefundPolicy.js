import "../../styles/pages/payment/LegalPage.scss";

const RefundPolicy = () => {
  return (
    <div className="legal-page">
      <h2>Refund Policy</h2>
      <p>
        This is a non-commercial portfolio project. As no real purchases occur,
        there are no refunds or returns involved.
      </p>

      <ul>
        <li>No actual payments are processed.</li>
        <li>
          Products displayed are fictitious and used solely for UI
          demonstration.
        </li>
        <li>
          Therefore, refund and return policies do not apply to this site.
        </li>
      </ul>
    </div>
  );
};

export default RefundPolicy;
