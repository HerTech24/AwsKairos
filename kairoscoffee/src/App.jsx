// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/global.css";

// Páginas implementadas
import Home from "./pages/Home";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
import ProductosPage from "./pages/ProductosPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";

// Contexto del carrito
import { CarritoProvider } from "./context/CarritoContext";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ⬅️ IMPORTA EL HOOK QUE SINCRONIZA Auth0 → Backend
import { useAuthBackend } from "./auth/useAuthBackend";

const App = () => {

  // ⬅️ ACTIVA LA SINCRONIZACIÓN AUTOMÁTICA
  useAuthBackend();

  return (
    <CarritoProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />   {/* ← AÑADIR */}
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </CarritoProvider>
  );
};

export default App;
