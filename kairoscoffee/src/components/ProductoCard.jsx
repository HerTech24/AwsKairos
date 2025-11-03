// src/components/ProductoCard.jsx
import React from "react";

const ProductoCard = ({ producto, agregarAlCarrito }) => {
  const handleAgregar = () => {
    // Aseguramos que el producto tenga estructura consistente
    const productoFormateado = {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precioUnitario || producto.precio,
      imagen: producto.imagen,
    };

    agregarAlCarrito(productoFormateado);
  };

  return (
    <div className="producto-card">
      {producto.imagen && <img src={producto.imagen} alt={producto.nombre} />}
      <div className="contenido">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <div className="precio">
          ${producto.precioUnitario || producto.precio}
        </div>
      </div>
      <button onClick={handleAgregar}>Agregar al carrito</button>
    </div>
  );
};

export default ProductoCard;
