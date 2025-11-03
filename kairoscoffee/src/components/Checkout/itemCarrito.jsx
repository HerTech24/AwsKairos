// src/components/Checkout/CheckoutItem.jsx
import React from "react";
import { useCarrito } from "../../context/CarritoContext";

const CheckoutItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCarrito();
  const { id, nombre, precio, quantity, imagen } = item;

  return (
    <li className="d-flex align-items-center mb-3 p-2 border-bottom">
      <img
        src={imagen}
        alt={nombre}
        className="rounded me-3"
        style={{ width: 50, height: 50, objectFit: "cover" }}
      />
      <div className="flex-grow-1">
        <span className="fw-bold d-block">{nombre}</span>
        <span className="text-muted small">
          {precio.toLocaleString("es-CL", { style: "currency", currency: "CLP" })} c/u
        </span>
      </div>

      <div className="d-flex align-items-center me-3">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => updateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          className="form-control mx-1 text-center"
          style={{ width: 50 }}
        />
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          +
        </button>
      </div>

      <span className="fw-bold me-2">
        {(precio * quantity).toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
      </span>

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => removeFromCart(id)}
      >
        ×
      </button>
    </li>
  );
};

export default CheckoutItem;
