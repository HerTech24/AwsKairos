// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

import LoginModal from "../components/LoginModal";
import ModernCarousel from "../components/ModernCarousel";
import ShippingBar from "../components/ShippingBar";
import CategoriesGrid from "../components/CategoriesGrid";
import BannerGif from "../components/BannerGif";
import CarritoPanel from "../components/CarritoPanel";

import "../styles/homeModern.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Usar el contexto global del carrito
  const { carrito, agregarProducto, toggleCart } = useCarrito();

  return (
    <>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="home-main">
        <ModernCarousel onVerProductos={() => navigate("/productos")} />

        <div className="home-content container">
          <ShippingBar />

          <section className="section intro-cards">
            <div className="intro-left">
              <h2>Un café. Un momento.</h2>
              <p className="lead">
                Cafés de especialidad, cápsulas y accesorios seleccionados
                con cariño. Disfruta la experiencia Kairos en cada taza.
              </p>
              <div className="intro-actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/productos")}
                >
                  Comprar ahora
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => setIsModalOpen(true)}
                >
                  Mi cuenta
                </button>
              </div>
            </div>
            <div className="intro-right">
              <div className="card-features">
                <div className="feature">
                  <div className="feature-icon">🚚</div>
                  <div>
                    <h4>Envío rápido</h4>
                    <p>Despachos 24-72h en Chile</p>
                  </div>
                </div>

                <div className="feature">
                  <div className="feature-icon">☕</div>
                  <div>
                    <h4>Café seleccionado</h4>
                    <p>Origen y tostado detallado</p>
                  </div>
                </div>

                <div className="feature">
                  <div className="feature-icon">⭐</div>
                  <div>
                    <h4>Calidad premium</h4>
                    <p>Atención personalizada</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section categories-section">
            <h3 className="section-title">Categorías destacadas</h3>
            <CategoriesGrid agregarAlCarrito={agregarProducto} />
          </section>

          <section className="section banner-section">
            <BannerGif />
          </section>
        </div>
      </main>

      {/* Panel del carrito */}
      <CarritoPanel />

      {/* Floating cart indicator - AHORA CLICKEABLE */}
      <div 
        className="floating-cart" 
        onClick={toggleCart}
        style={{ cursor: 'pointer' }}
        title="Ver carrito"
      >
        <div className="cart-inner">
          <span className="cart-emoji">🛒</span>
          <div className="cart-info">
            <div className="cart-count">{carrito.length}</div>
            <div className="cart-label">Productos</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;