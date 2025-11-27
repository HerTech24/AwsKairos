// src/components/home/CategoriesGrid.jsx
import React from "react";

const demoCategories = [
  { id: "cafe", title: "Café", img: "", color: "#6b4f3a" },
  { id: "capsulas", title: "Cápsulas", img: "", color: "#5C4A3C" },
  { id: "accesorios", title: "Accesorios", img: "", color: "#2E1F18" },
  { id: "yerba", title: "Yerba Mate", img: "", color: "#556B2F" },
];

const CategoriesGrid = ({ agregarAlCarrito = () => {} }) => {
  return (
    <div className="categories-grid">
      {demoCategories.map((c) => (
        <article key={c.id} className="categoria-card-modern">
          <div
            className="categoria-visual"
            style={{
              background: `linear-gradient(135deg, ${c.color}33, #0000)`,
            }}
          >
            <div className="categoria-emoji">{c.id === "cafe" ? "☕" : c.id === "capsulas" ? "🧋" : c.id === "accesorios" ? "🛠️" : "🍃"}</div>
          </div>

          <div className="categoria-body">
            <h4>{c.title}</h4>
            <p className="categoria-desc">Selección curada y ofertas exclusivas</p>
            <div className="categoria-actions">
              <button className="link-faded">Ver</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CategoriesGrid;
