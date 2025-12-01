import React, { useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import LogoKairos from "../assets/img/Logo_KairosCoffee.png";
import "../styles/confirmation.css";

const ConfirmationPage = () => {
  const { clearCart } = useCarrito();

  useEffect(() => {
    clearCart(); // Vacía el carrito al cargar la página
  }, []);

  return (
    <div className="confirmation-page container text-center py-5">
      <h1 className="text-kairos-primary">¡Gracias por tu compra!</h1>
      <p className="mb-4">Tu pedido ha sido recibido y está en proceso de despacho.</p>
      <img
        src={LogoKairos}
        alt="Logo Kairos Coffee"
        className="logo-confirmacion mt-3"
      />
    </div>
  );
};

export default ConfirmationPage;
