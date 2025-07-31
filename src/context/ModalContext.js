import { createContext, useState, useContext, useRef } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    type: null,
    message: "",
    visible: false,
    onConfirm: null,
  });

  const timeoutRef = useRef(null);

  const showModal = (type, message, onConfirm = null) => {
    clearTimeout(timeoutRef.current); // Clear previous timeout if any

    setModal({ type, message, visible: true, onConfirm });

    if (type === "loading") {
      // Start a 30s timeout only for loading modal
      timeoutRef.current = setTimeout(() => {
        setModal({
          type: "error",
          message: "Request timeout. Please contact administrator for help.",
          visible: true,
        });
      }, 30000); // 30 seconds
    }
  };

  const hideModal = () => {
    clearTimeout(timeoutRef.current); // Clear timeout on any close
    setModal((prev) => ({ ...prev, visible: false, onConfirm: null }));
  };

  return (
    <ModalContext.Provider value={{ modal, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
