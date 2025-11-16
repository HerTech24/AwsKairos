// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider"; // ✅ Importa tu Auth0 wrapper
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/global.css";

console.log("DOMAIN:", process.env.REACT_APP_AUTH0_DOMAIN);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
