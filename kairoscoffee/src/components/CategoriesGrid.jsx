import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    categoria: "cafe",
    img: "https://png.pngtree.com/png-vector/20230501/ourmid/pngtree-coffee-bean-material-png-image_7078658.png",
    alt: "Café en grano",
    title: "CAFÉ EN GRANO",
  },
  {
    categoria: "cafe",
    img: "https://png.pngtree.com/png-vector/20240913/ourmid/pngtree-ground-coffee-png-image_12926372.png",
    alt: "Café molido",
    title: "CAFÉ MOLIDO",
  },
  {
    categoria: "capsulas",
    img: "https://png.pngtree.com/png-vector/20231113/ourmid/pngtree-coffee-capsules-pleasure-png-image_10448876.png",
    alt: "Cápsulas de café",
    title: "CÁPSULAS",
  },
  {
    categoria: "yerba",
    img: "https://espressionante.com/wp-contenido/uploads/2024/04/220512_ipso_800x800_forte_01-1.png",
    alt: "Té o mate",
    title: "TÉ Y MATE",
  },
  {
    categoria: "accesorios",
    img: "https://png.pngtree.com/png-clipart/20231017/original/pngtree-moka-pot-italian-coffee-maker-file-png-png-image_13326139.png",
    alt: "Accesorios para café",
    title: "ACCESORIOS",
  },
];

export default function CategoriesGrid() {
  const navigate = useNavigate();

  const handleClick = (categoria) => {
    navigate(`/productos?categoria=${categoria}`);
  };

  return (
    <section className="categorias-section container my-5">
      <h2 className="visually-hidden">Explora nuestras categorías</h2>
      <div className="categorias-grid">
        {categories.map(({ categoria, img, alt, title }, idx) => (
          <div
            key={idx}
            className="categoria-card"
            onClick={() => handleClick(categoria)}
            style={{ cursor: "pointer" }}
          >
            <img src={img} alt={alt} />
            <div className="categoria-titulo">{title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
