import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import MarketplacePage from "./MarketplacePage.jsx"; // Add this import
import SignInPage from "./SignInPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} /> {/* Add this route */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignUpPage />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);