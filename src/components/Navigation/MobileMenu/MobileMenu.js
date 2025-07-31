import "./MobileMenu.scss";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";

function MobileMenu({ isOpen, onClose, user, logoutUser }) {
  return (
    <div
      className={`mobile-menu-overlay ${isOpen ? "visible" : ""}`}
      onClick={onClose}
    >
      <div
        className={`mobile-menu-panel ${
          isOpen ? "mobile-menu-visible" : "mobile-menu-hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="mobile-menu-header">
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {/* Nav Links */}
        <div className="menu-scrollable">
          <ul className="menu-links">
            <li>
              <NavLink to="/shop/new-arrival" onClick={onClose}>
                New Arrivals
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/men" onClick={onClose}>
                Men
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/women" onClick={onClose}>
                Women
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/kids" onClick={onClose}>
                Kids
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer user section */}
        <div className="mobile-menu-user">
          <div className="user-info">
            {user ? (
              <div className="user-options-container">
                <p className="user-name">
                  <FaRegUser className="user-name-icon" />
                  <span className="user-name-text">{user.name}</span>
                </p>
                <NavLink to="/profile" onClick={onClose}>
                  Profile
                </NavLink>
                <NavLink to="/orders" onClick={onClose}>
                  View Orders
                </NavLink>
                <button className="logout-btn" onClick={logoutUser}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" onClick={onClose} className="login-btn">
                <p className="user-name">
                  <FaRegUser className="user-name-icon" />
                  <span className="user-name-text">Log In</span>
                </p>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
