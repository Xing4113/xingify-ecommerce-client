import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import VerfiyAccount from "./pages/VerfiyAccount";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/payment/PlaceOrder";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentCancel from "./pages/payment/PaymentCancel";
import TermsOfService from "./pages/payment/TermsOfService";
import PrivacyPolicy from "./pages/payment/PrivacyPolicy";
import RefundPolicy from "./pages/payment/RefundPolicy";
import Terms from "./pages/payment/Term";
import PrivacyCookies from "./pages/payment/PrivacyCookies";
import Layout from "./components/Layout/Layout";
import PaymentLayout from "./components/Layout/PaymentLayout";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";

import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";

import InfoModal from "./components/Modal/InfoModal";

function App() {
  return (
    <ModalProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Routes without header */}
              <Route path="/login" element={<Login />} />
              <Route path="/verifyAccount" element={<VerfiyAccount />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Routes with header */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/shop/:category"
                element={
                  <Layout>
                    <ProductCatalogPage />
                  </Layout>
                }
              />
              <Route
                path="/cart"
                element={
                  <Layout>
                    <Cart />
                  </Layout>
                }
              />

              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />

              <Route
                path="/payment/place-order"
                element={
                  <PaymentLayout>
                    <PlaceOrder />
                  </PaymentLayout>
                }
              />
              <Route
                path="/payment/success"
                element={
                  <PaymentLayout>
                    <PaymentSuccess />
                  </PaymentLayout>
                }
              />
              <Route
                path="/payment/cancel"
                element={
                  <PaymentLayout>
                    <PaymentCancel />
                  </PaymentLayout>
                }
              />

              <Route
                path="/payment/terms-of-service"
                element={
                  <PaymentLayout>
                    <TermsOfService />
                  </PaymentLayout>
                }
              />

              <Route
                path="/payment/privacy-policy"
                element={
                  <PaymentLayout>
                    <PrivacyPolicy />
                  </PaymentLayout>
                }
              />

              <Route
                path="/payment/refund-policy"
                element={
                  <PaymentLayout>
                    <RefundPolicy />
                  </PaymentLayout>
                }
              />

              <Route
                path="/payment/terms"
                element={
                  <PaymentLayout>
                    <Terms />
                  </PaymentLayout>
                }
              />

              <Route
                path="/payment/privacy-cookies"
                element={
                  <PaymentLayout>
                    <PrivacyCookies />
                  </PaymentLayout>
                }
              />

              <Route
                path="/orders"
                element={
                  <Layout>
                    <OrderHistory />
                  </Layout>
                }
              />
            </Routes>

            <InfoModal />
          </Router>
        </CartProvider>
      </UserProvider>
    </ModalProvider>
  );
}

export default App;
