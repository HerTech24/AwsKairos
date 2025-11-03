// src/components/CarritoPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import "../styles/productos.css";

const CarritoPanel = () => {
  const {
    carrito,
    eliminarProducto,
    updateQuantity,
    isCartOpen,
    toggleCart,
  } = useCarrito();
  const navigate = useNavigate();

  const total = carrito.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.quantity || 1),
    0
  );

  const irACheckout = () => {
    toggleCart();
    navigate("/checkout");
  };

  return (
    <div className={`carrito-panel ${isCartOpen ? "active" : ""}`}>
      <div className="carrito-header">
        <h2>Carrito</h2>
        <button className="cerrar-carrito" onClick={toggleCart} aria-label="Cerrar carrito">
          <i className="fas fa-times-circle"></i>
        </button>
      </div>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío</p>
      ) : (
        <>
          <div className="lista-carrito">
            {carrito.map((item, index) => (
              <div key={index} className="item-carrito">
                {item.imagen && <img src={item.imagen} alt={item.nombre} />}
                <div className="info">
                  <div className="info-header">
                    <span className="nombre">{item.nombre}</span>
                    <button
                      className="eliminar-item"
                      onClick={() => eliminarProducto(index)}
                    >
                      🗑️
                    </button>
                  </div>
                  <span className="precio-unitario">
                    ${item.precio.toLocaleString("es-CL")} c/u
                  </span>
                  <div className="cantidad-control">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      disabled={item.quantity <= 1}
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="subtotal">
                    Subtotal: ${(item.precio * item.quantity).toLocaleString("es-CL")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="footer-carrito">
            <div className="total">
              Total: ${total.toLocaleString("es-CL")}
            </div>
            <button className="btn-pagar" onClick={irACheckout}>
              Ir al Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarritoPanel;
