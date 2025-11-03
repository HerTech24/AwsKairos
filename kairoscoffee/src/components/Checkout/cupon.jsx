import React, { useState } from "react";

const CouponSection = ({ setDescuento }) => {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const CUPON_VALIDO = "KAIROS10";

  const aplicarCupon = () => {
    if (codigo.trim().toUpperCase() === CUPON_VALIDO) {
      setDescuento(0.1);
      setMensaje("✅ Cupón aplicado: 10% de descuento.");
    } else {
      setDescuento(0);
      setMensaje("❌ Cupón inválido.");
    }
  };

  return (
    <div className="cupon-section">
      <input
        type="text"
        placeholder="Código de cupón"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button onClick={aplicarCupon}>Aplicar</button>
      {mensaje && <p className="mensaje-cupon">{mensaje}</p>}
    </div>
  );
};

export default CouponSection;
