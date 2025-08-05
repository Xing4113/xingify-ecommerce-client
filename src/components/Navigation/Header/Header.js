import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import SearchBar from "./SearchBar/SearchBar";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../../assets/icons/logo-rm.svg";
import { FaRegUser } from "react-icons/fa6";
import { BsMinecart } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from "../../../context/CartContext";

function Header({ user, logout, onMenuToggle }) {
  const { cartCount } = useCart();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false); // Scrolling down
          setShowDropdown(false);
        } else {
          setShowHeader(true); // Scrolling up
        }
      } else {
        setShowHeader(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`header ${showHeader ? "show" : "hide"}`}>
      <nav className="navbar">
        <div className="logo-image-wrapper">
          <Link to="/">
            <LogoIcon className="logo-img" />
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/shop/new-arrival" className="nav-link">
              New Arrivals
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/men" className="nav-link">
              Men
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/women" className="nav-link">
              Women
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/kids" className="nav-link">
              Kids
            </NavLink>
          </li>
        </ul>

        <ul className="item-links">
          <li className="search-icon-wrapper">
            <div className="nav-icon-wrapper">
              <SearchBar />
            </div>
          </li>
          <li className="cart-icon-wrapper">
            <div className="nav-icon-wrapper">
              <Link to="/cart">
                <BsMinecart className="item-icon" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </div>
          </li>
          <li className="user-icon-wrapper ">
            <div className="nav-icon-wrapper">
              {user ? (
                <div
                  className={`user-dropdown-container ${
                    showDropdown ? "dropdown-active" : ""
                  }`}
                  ref={dropdownRef}
                >
                  <button
                    className="user-toggle-btn"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  >
                    <FaRegUser className="item-icon" />
                  </button>
                  {showDropdown && (
                    <div
                      className={`user-dropdown ${
                        showDropdown ? "visible" : ""
                      }`}
                    >
                      <p className="user-name">
                        <FaRegUser className="user-name-icon" />
                        <span className="user-name-text">{user.name}</span>
                      </p>
                      <Link to="/profile">Profile</Link>
                      <Link to="/orders">View Orders</Link>
                      <button className="logout-btn" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="login-link">
                  <FaRegUser className="item-icon" />
                  <span className="login-text">Log In</span>
                </Link>
              )}
            </div>
          </li>
          <li>
            <button className="mobile-menu-btn" onClick={onMenuToggle}>
              <GiHamburgerMenu className="item-icon" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
