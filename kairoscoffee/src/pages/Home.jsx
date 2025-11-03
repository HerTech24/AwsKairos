// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Carousel from "../components/Carousel";
import ShippingBar from "../components/ShippingBar";
import CategoriesGrid from "../components/CategoriesGrid";
import BannerGif from "../components/BannerGif";
import "../styles/global.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <>
      {/* Modal de login */}
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Carrusel principal con botón funcional */}
      <Carousel onVerProductos={() => navigate("/productos")} />

      {/* Barra de carrito simple */}
      <div style={{
        position: "fixed",
        top: 10,
        right: 10,
        background: "#fff",
        padding: "5px 10px",
        borderRadius: "5px",
        boxShadow: "0 0 5px rgba(0,0,0,0.2)"
      }}>
        🛒 Carrito: {carrito.length} productos
      </div>

      {/* Contenido principal */}
      <main>
        <ShippingBar />
        <CategoriesGrid agregarAlCarrito={agregarAlCarrito} />
        <BannerGif />
      </main>
    </>
  );
};

export default Home;
