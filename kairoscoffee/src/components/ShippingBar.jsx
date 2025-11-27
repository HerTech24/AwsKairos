// src/components/home/ShippingBar.jsx
import React, { useEffect, useState } from "react";

const messages = [
  "Envío gratis en compras sobre $25.000 · 24-72h",
  "Pago seguro · Soporte 24/7",
  "Productos de origen certificable",
];

const ShippingBar = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="shipping-bar">
      <div className="shipping-inner">
        <strong>Envío</strong>
        <div className="shipping-message">{messages[i]}</div>
      </div>
    </div>
  );
};

export default ShippingBar;
