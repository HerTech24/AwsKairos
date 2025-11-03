import React, { useState, useEffect } from "react";
import "../styles/global.css";
import { FaTruck } from "react-icons/fa"; // Icono de camión

const messages = [
  'Envío **GRATIS** sobre $30.000',
  'Enviamos a **TODAS** las regiones',
  'Envío **EXPRESS** en menos de 24hrs'
];

export default function ShippingBar() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (messages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Convertir **bold** en <strong>
    const formatMessage = (msg) => {
        return msg.split("**").map((part, idx) => 
            idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
        );
    }

    return (
        <section className="shipping-bar-horizontal">
            <p className="shipping-message active">
                <FaTruck style={{ marginRight: '8px', color: '#556B2F' }} />
                {formatMessage(messages[current])}
            </p>
        </section>
    );
}
