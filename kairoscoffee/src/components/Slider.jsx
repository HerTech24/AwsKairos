// src/components/Slider.jsx
import React, { useRef } from "react";
import ProductoCard from "./ProductoCard";

export default function Slider({ items, agregarAlCarrito }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="slider-container">
      <button className="carrusel-btn prev" onClick={scrollLeft} aria-label="Anterior">
        &lt;
      </button>

      <div className="slider" ref={sliderRef}>
        {items.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      <button className="carrusel-btn next" onClick={scrollRight} aria-label="Siguiente">
        &gt;
      </button>
    </div>
  );
}
