import React, { useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import "./InfoModal.scss";
import { TbCircleDashedCheck, TbCircleDashedX } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { LiaSpinnerSolid } from "react-icons/lia";

const iconMap = {
  success: <TbCircleDashedCheck className="icon success" />,
  error: <TbCircleDashedX className="icon error" />,
  warning: <PiWarningCircle className="icon warning" />,
  loading: <LiaSpinnerSolid className="icon loading spin" />,
};

const InfoModal = () => {
  const { modal, hideModal } = useModal();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && modal.visible && modal.type !== "loading") {
        hideModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modal, hideModal]);

  if (!modal.visible) return null;

  const handleOverlayClick = () => {
    if (modal.type !== "loading") hideModal();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`info-modal ${
          modal.type === "loading" ? "loading-style" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {modal.type !== "loading" && modal.type !== "warning" && (
          <button className="modal-close-btn" onClick={hideModal}>
            <FaTimes />
          </button>
        )}

        {iconMap[modal.type] || null}
        <p>{modal.message}</p>

        {modal.type === "warning" && (
          <div className="warning-buttons">
            <button
              className="confirm-btn"
              onClick={() => {
                hideModal();
                modal.onConfirm && modal.onConfirm();
              }}
            >
              Confirm
            </button>
            <button className="cancel-btn" onClick={hideModal}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoModal;
