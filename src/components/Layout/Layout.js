import { useState, useEffect } from "react";
import Banner from "../Navigation/Header/Banner/Banner";
import Header from "../Navigation/Header/Header";
import Footer from "../Navigation/Footer/Footer";
import MobileMenu from "../Navigation/MobileMenu/MobileMenu";
import { useUser } from "../../context/UserContext";
import useIsMobileView from "../../hook/useIsMobileView";

const Layout = ({ children }) => {
  const { user, logout } = useUser();
  const isMobileView = useIsMobileView();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileView && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileView, isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="layout-container">
      <Banner />
      <Header
        onMenuToggle={() => setIsMobileMenuOpen(true)}
        user={user}
        logout={logout}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        logout={logout}
      />

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
