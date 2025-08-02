import React, { useEffect, useState } from "react";
import { getAvailableSizes, updateCartItemSize } from "../../../api/cartAPI";
import "./SizeModal.scss";
import { IoMdClose } from "react-icons/io";

const SizeModal = ({ isOpen, itemId, onClose, updateCart }) => {
  const [allSizes, setAllSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !itemId) return;

    const fetchSizes = async () => {
      setLoading(true);
      try {
        const res = await getAvailableSizes(itemId);

        setAllSizes(res.data.sizes?.allSize || []);
        setAvailableSizes(
          res.data.sizes?.availableSize.map((s) => s.size) || []
        );
      } catch (err) {
        console.error("Failed to fetch sizes", err);
        setAllSizes([]);
        setAvailableSizes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, [isOpen, itemId]);

  const handleSizeSelect = async (newSize) => {
    try {
      await updateCartItemSize(itemId, newSize);
      onClose();
      updateCart();
    } catch (err) {
      console.error("Failed to update size", err);
    }
  };

  if (!isOpen) return null;

  const availableSizeSet = new Set(availableSizes);

  return (
    <div className="size-modal-overlay" onClick={onClose}>
      <div className="size-modal" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn-wrapper">
          <button className="close-btn" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h4>Select Size</h4>

        {loading ? (
          <p>Loading sizes...</p>
        ) : allSizes.length === 0 ? (
          <p>No sizes available for this product.</p>
        ) : (
          <div className="size-options">
            {allSizes.map((size) => (
              <button
                key={size}
                className="size-option"
                onClick={() => handleSizeSelect(size)}
                disabled={!availableSizeSet.has(size)}
              >
                US{size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SizeModal;
