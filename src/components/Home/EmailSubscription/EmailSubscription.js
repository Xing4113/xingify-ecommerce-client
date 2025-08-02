import React, { useState } from "react";
import "./EmailSubscription.scss";
import { addEmailSubscription } from "../../../api/emailSubscription";
import { useModal } from "../../../context/ModalContext";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showModal } = useModal();

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    showModal("loading");

    try {
      const res = await addEmailSubscription(email);

      showModal("success", res.data.message || "Subscribed successfully.");
      setEmail("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Subscription failed. Please try again later.";
      showModal("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <section className="email-subscription-wrapper">
      <div className="email-subscription">
        <h2>First Dibs on Fresh Drops.</h2>
        <p>
          Join our list and be the first to hear about new arrivals, exclusive
          deals, and limited editions before they sell out.
        </p>

        <form className="subscription-form" onSubmit={handleSubmit}>
          <div className="email-input-container">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className={error ? "error-border" : ""}
              disabled={isSubmitting}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            SUBSCRIBE
          </button>
        </form>

        <p className="disclaimer">
          No spam. Just the shoes you'll actually love. See our{" "}
          <a href="#">Privacy Policy</a> and <a href="#">Terms</a>.
        </p>
      </div>
    </section>
  );
};

export default EmailSubscription;
