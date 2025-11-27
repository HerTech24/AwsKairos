// src/components/home/ModernCarousel.jsx
import React, { useState, useEffect } from "react";

// === Tus imágenes originales restauradas ===
const images = [
  "https://www.branding.news/wp-content/uploads/2017/09/03_Taylors-of-Harrogate_Pearlfisher_Origins-Coffee-Range_Digital_02.jpg",
  "https://mercadodelcafe.cl/cdn/shop/files/Banner_Queres_ser_distribuidor_3ba621ff-56b8-49cf-b563-2117396c78cc.png?crop=center&height=600&v=1732561906&width=1500",
  "https://www.illy.com/on/demandware.static/-/Sites-siteCatalog_illycaffe_SFRA_ES/default/dwedea435b/plp_header/PLP_caff%C3%A8_Banner%20home_CAM_03_A_2880%C3%97800.jpg",
  "https://live.staticflickr.com/8426/7738096728_0d0f420c2f_k.jpg",
  "https://www.occaffe.cl/cdn/shop/files/Banner_occaffe_1000x1000.jpg?v=1622158073"
];

const ModernCarousel = ({ onVerProductos = () => {} }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="modern-carousel">
      {images.map((img, i) => (
        <div
          key={i}
          className={`carousel-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
          aria-hidden={i !== index}
        >

          {/* Oscurecido para que el texto contraste */}
          <div className="carousel-overlay">
            <h2>Bienvenido a Kairos Coffee</h2>
            <p>Calidad premium para cada momento</p>

            <div className="carousel-cta">
              <button className="btn-primary" onClick={onVerProductos}>
                Ver productos
              </button>
              <button className="btn-ghost">
                Conócenos
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ModernCarousel;
