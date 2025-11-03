import React, { useEffect, useState } from "react";
import "../styles/global.css";

const images = [
  "https://www.branding.news/wp-content/uploads/2017/09/03_Taylors-of-Harrogate_Pearlfisher_Origins-Coffee-Range_Digital_02.jpg",
  "https://mercadodelcafe.cl/cdn/shop/files/Banner_Queres_ser_distribuidor_3ba621ff-56b8-49cf-b563-2117396c78cc.png?crop=center&height=600&v=1732561906&width=1500",
  "https://www.illy.com/on/demandware.static/-/Sites-siteCatalog_illycaffe_SFRA_ES/default/dwedea435b/plp_header/PLP_caff%C3%A8_Banner%20home_CAM_03_A_2880%C3%97800.jpg",
  "https://live.staticflickr.com/8426/7738096728_0d0f420c2f_k.jpg",
  "https://www.occaffe.cl/cdn/shop/files/Banner_occaffe_1000x1000.jpg?v=1622158073"
];

const Carousel = ({ onVerProductos }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="carousel">
      {images.map((img, index) => (
        <div
          key={index}
          className={`carousel-item ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="overlay">
            <div className="text-content">
              <h2>Bienvenido a Kairos Coffee</h2>
              <p>Descubre nuestros productos y promociones</p>
              <button className="btn-ver-productos" onClick={onVerProductos}>
                Ver productos
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
