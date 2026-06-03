import React from "react";
import ReactDOM from "react-dom/client";

import "./App.css";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
 import RegisterPage from "./pages/Register";
 import LoginPage from "./pages/login";
 import ForgotPassword from "./pages/forgotPassword";
 import ForgotPasswordEmailPage from "./pages/forgotPasswordEmail";
 import Setting from "./pages/setting";
 import Account from "./pages/account";
 import Security from "./pages/security";
 import ChangePassword from "./pages/changePassword";
 import DeleteAccount from "./pages/deleteAccount";
 import Analytics from "./pages/analytics";
 import Home from "./pages/home";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password-email" element={<ForgotPasswordEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/account" element={<Account />} />
        <Route path="/security" element={<Security />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}