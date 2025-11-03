import { useContext } from "react";
import { CartContext } from '../context/CartContext';

/**
 * Hook personalizado para acceder al estado y funciones del carrito.
 * Asegura que se use dentro de un CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  return context;
};
