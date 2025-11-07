import React from "react";
import { CartContext } from "../../context/CartContext";

/**
 * MockCartProvider - Proveedor simulado para pruebas
 * Permite inyectar un valor de contexto controlado durante los tests.
 * Compatible con Karma + Jasmine + React Testing Library
 */
const MockCartProvider = ({ children, cartValue = {} }) => {
  const defaultValue = {
    cartItems: [],
    addToCart: jasmine.createSpy("addToCart"),
    removeFromCart: jasmine.createSpy("removeFromCart"),
    toggleCart: jasmine.createSpy("toggleCart"),
    isCartOpen: false,
    ...cartValue, // Permite sobreescribir cualquier valor desde el test
  };

  return (
    <CartContext.Provider value={defaultValue}>
      {children}
    </CartContext.Provider>
  );
};

export default MockCartProvider;
