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
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
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