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

function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
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