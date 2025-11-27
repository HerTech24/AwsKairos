// src/components/PurchaseHistory.jsx
import React from "react";
import "../styles/userProfile.css";

const PurchaseHistory = ({ compras = [] }) => {
  return (
    <div className="perfil-compras">
      <h3>Historial de Compras</h3>

      {compras.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        compras.map((compra, index) => (
          <div key={index} className="compra-card">
            <p className="compra-fecha">
              {new Date(compra.fecha).toLocaleDateString()}
            </p>

            <ul>
              {compra.productos.map((p, i) => (
                <li key={i}>
                  {p.nombre} — {p.cantidad} x ${p.precio}
                </li>
              ))}
            </ul>

            <p className="compra-total">Total: ${compra.total}</p>

            {/* 🔥 Aquí está el nuevo enlace */}
            <button className="btn-detalle" onClick={() => {}}>
              Ver detalle
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseHistory;
