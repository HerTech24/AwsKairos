// src/components/home/BannerGif.jsx
import React from "react";

const BannerGif = () => {
  return (
    <div className="hero-banner">
      <div className="hero-left">
        <h3>Descubre la nueva línea de cafés de temporada</h3>
        <p>Edición limitada — tostado por experta mano local.</p>
        <button className="btn-primary">Ver colección</button>
      </div>
      <div className="hero-right" aria-hidden>
        {/* Placeholder ilustrativo (puedes reemplazar por gif) */}
        <div className="hero-art">☕✨</div>
      </div>
    </div>
  );
};

export default BannerGif;
