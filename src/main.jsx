import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import MarketplacePage from "./MarketplacePage.jsx";
import SignInPage from "./SignInPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import SellerDashboard from "./SellerDashboard.jsx";
import BuyerDashboard from './BuyerDashboard.jsx';
import TransportDashboard from './TransportDashboard.jsx';  // Add this import
import CheckoutPage from './CheckoutPage';

// Add to your routes

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/transport-dashboard" element={<TransportDashboard />} /> 
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Add this route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
