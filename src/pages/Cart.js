import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  increaseCartItem,
  decreaseCartItem,
  deleteCartItem,
} from "../api/cartAPI";
import "../styles/pages/Cart.scss";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import SizeModal from "../components/Cart/SizeModal/SizeModal";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItems, updateCartCount } = useCart();
  const { showModal } = useModal();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  const refreshCart = () => {
    updateCartItems();
    updateCartCount();
  };

  const handleIncrease = async (itemId) => {
    try {
      await increaseCartItem(itemId);
      refreshCart();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to increase quantity", err);
      }
    }
  };

  const handleDecrease = async (itemId) => {
    try {
      await decreaseCartItem(itemId);
      refreshCart();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to decrease quantity", err);
      }
    }
  };

  const handleDelete = async (itemId) => {
    showModal("warning", "Are you sure to remove this item?", async () => {
      showModal("loading");
      try {
        await deleteCartItem(itemId);
        refreshCart();
        showModal("success", "Item removed successfully.");
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Failed to delete cart item", err);
        }
        showModal("error", "Failed to remove item.");
      }
    });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <div className="cart-page mt-space">
      <div className="cart-section">
        {/* Cart Item Details */}
        <div className="cart-items-section">
          <h3>Shopping Cart</h3>
          <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <p className="no-item-statement">
                There are no items in your cart.
              </p>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-info-container">
                    <div className="item-image-container">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="item-img"
                      />
                    </div>
                    <div className="item-description-container">
                      <div className="item-description">
                        <h3>{item.product.name}</h3>
                        <p>{item.color}</p>
                        <p>
                          Size{" "}
                          <span
                            className="size-selector"
                            onClick={() => {
                              setSelectedItemId(item.id);
                              setIsSizeModalOpen(true);
                            }}
                          >
                            US{item.size}
                          </span>
                        </p>
                      </div>
                      <div className="item-price">
                        $ {(item.quantity * item.product.price).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="item-controls">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => handleDecrease(item.id)}
                      >
                        <FiMinusCircle />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleIncrease(item.id)}
                      >
                        <FiPlusCircle />
                      </button>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="cart-summary">
          <h3>Summary</h3>
          <p>
            Subtotal <span className="subtotal">${totalPrice.toFixed(2)}</span>
          </p>
          <p>
            Shipping Fee <span className="shipping-free">Free</span>
          </p>
          <hr />
          <p className="total">
            Total <span>${totalPrice.toFixed(2)}</span>
          </p>
          <div className="checkout-btn-wrapper">
            <button
              className="checkout-btn"
              onClick={() => navigate("/payment/place-order")}
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <SizeModal
        isOpen={isSizeModalOpen}
        itemId={selectedItemId}
        onClose={() => setIsSizeModalOpen(false)}
        updateCart={updateCartItems}
      />
    </div>
  );
};

export default Cart;
