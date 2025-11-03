// src/components/Carrito.jsx
import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

export default function Carrito() {
  const { carrito, removeFromCart, toggleCart } = useCarrito();
  const [isOpen, setIsOpen] = useState(false);

  const total = carrito.reduce((acc, item) => acc + item.precio * (item.quantity || 1), 0);

  const handlePagar = () => {
    if (carrito.length > 0) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
      window.location.href = "/checkout";
    } else {
      alert("El carrito está vacío. Agrega productos antes de pagar.");
    }
  };

  return (
    <div className="carrito-container">
      <button onClick={() => setIsOpen(true)}>
        🛒 {carrito.length}
      </button>

      {isOpen && (
        <div id="carrito-panel" className="carrito-panel active">
          <button id="cerrar-carrito" onClick={() => setIsOpen(false)}>
            ×
          </button>
          <h2>Carrito</h2>
          <div id="lista-carrito">
            {carrito.map((item) => (
              <div className="item-carrito" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <span>{item.nombre}</span>
                <span>
                  ${item.precio.toLocaleString("es-CL")} x {item.quantity || 1}
                </span>
                <button onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))}
          </div>
          <div id="total-carrito">Total: ${total.toLocaleString("es-CL")}</div>
          <button id="btn-pagar" onClick={handlePagar}>
            Pagar
          </button>
        </div>
      )}
    </div>
  );
}
