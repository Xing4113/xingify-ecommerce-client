import { useState, useEffect } from "react";
import { prepareOrder } from "../../api/orderAPI";
import { searchAddress } from "../../api/externalAPI";
import * as yup from "yup";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { useModal } from "../../context/ModalContext";
import "../../styles/pages/payment/PlaceOrder.scss";
import DeliveryForm from "../../components/PlaceOrder/DeliveryForm/DeliveryForm";
import DeliveryOptions from "../../components/PlaceOrder/DeliveryOptions/DeliveryOptions";
import PayWithCardButton from "../../components/PlaceOrder/PayWithCardButton/PayWithCardButton";
import SummaryOrder from "../../components/PlaceOrder/SummaryOrder/SummaryOrder";
import useIsMobileView from "../../hook/useIsMobileView";

// Yup schema
const placeOrderSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  phoneNumber: yup
    .string()
    .matches(/^[689]\d{7}$/, "Please enter a valid phone number")
    .required("Please enter your phone number"),
  postalCode: yup
    .string()
    .matches(/^\d{6}$/, "Please enter a valid postal code")
    .required("Please enter your postal code"),
  streetAddress: yup.string().required("Please enter your street address"),
});

function PlaceOrder() {
  const isMobileView = useIsMobileView();

  const { showModal } = useModal();
  const { cartItems } = useCart();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    unitNumber: "",
    postalCode: "",
    city: "SINGAPORE",
  });

  const [errors, setErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Autofill from user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        streetAddress: user.street_address || "",
        unitNumber: user.unit_number || "",
        postalCode: user.postal_code || "",
        phoneNumber: user.phone_number || "",
      }));
    }
  }, [user]);

  const getDeliveryCharge = () => (deliveryOption === "express" ? 10 : 0);

  const itemsTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const deliveryCharge = getDeliveryCharge();
  const finalTotal = itemsTotal + deliveryCharge;

  // Handle input changes with validation
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    try {
      await placeOrderSchema.validateAt(name, updated);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }

    if (name === "postalCode") {
      if (!/^\d{6}$/.test(value.trim())) {
        setFormData((prev) => ({ ...prev, streetAddress: "", unitNumber: "" }));
        return;
      }

      try {
        const data = await searchAddress(value.trim());

        if (data.found > 0 && data.results[0]?.POSTAL === value.trim()) {
          const result = data.results[0];
          const block = result.BLK_NO?.trim() || "";
          const road = result.ROAD_NAME?.trim() || "";
          const streetAddress = block ? `${block} ${road}` : road;

          setFormData((prev) => ({
            ...prev,
            streetAddress,
          }));
          setErrors((prev) => ({
            ...prev,
            streetAddress: undefined,
            postalCode: undefined,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            streetAddress: "",
            unitNumber: "",
          }));
          setErrors((prev) => ({
            ...prev,
            postalCode: "Invalid postal code",
          }));
          showValidation(true);
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("OneMap API error:", error);
        }
        setErrors((prev) => ({
          ...prev,
          postalCode: "Failed to validate postal code",
        }));
      }
    }
  };

  // Validate all fields before submission
  const validateAll = async () => {
    try {
      await placeOrderSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const mapped = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(mapped);
      return false;
    } finally {
      setShowValidation(true);
    }
  };

  const getExpectedArrivalDate = (deliveryType) => {
    const now = new Date();
    const startDate = new Date(now);
    const endDate = new Date(now);

    const daysToAdd = deliveryType === "express" ? 2 : 4;
    startDate.setDate(now.getDate() + daysToAdd);
    endDate.setDate(now.getDate() + daysToAdd + 1); // next day

    const formatDate = (date) => date.toISOString().split("T")[0];

    return `${formatDate(startDate)},${formatDate(endDate)}`;
  };

  const handlePlaceOrder = async () => {
    const isValid = await validateAll();
    if (!isValid) return;

    setIsSubmitting(true);
    showModal("loading");

    try {
      const response = await prepareOrder({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        streetAddress: formData.streetAddress,
        unitNumber: formData.unitNumber,
        postalCode: formData.postalCode,
        city: formData.city,
        deliveryType: deliveryOption,
        deliveryFee: deliveryCharge,
        totalAmount: finalTotal,
        expectedDate: getExpectedArrivalDate(deliveryOption),
        items: cartItems,
      });

      const data = response.data;

      if (data.status === "unavailable") {
        showModal(
          "error",
          "Some items are out of stock. Please update your cart."
        );
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        showModal("error", "Something went wrong. Please try again.");
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Order creation or validation failed:", err);
      }
      showModal("error", "Unable to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="place-order-container">
      <div className="delivery-info-container">
        <h2>Delivery</h2>

        <DeliveryForm
          formData={formData}
          errors={errors}
          showValidation={showValidation}
          handleChange={handleChange}
        />

        <h2>Delivery Options</h2>

        <DeliveryOptions
          selectedOption={deliveryOption}
          onChange={setDeliveryOption}
        />

        {!isMobileView && (
          <PayWithCardButton
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
          />
        )}
      </div>

      <div className="summary-section">
        {isMobileView && <h2>Order Summary</h2>}

        <SummaryOrder
          cartItems={cartItems}
          deliveryOption={deliveryOption}
          deliveryCharge={deliveryCharge}
          finalTotal={finalTotal}
        />

        {isMobileView && (
          <PayWithCardButton
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
