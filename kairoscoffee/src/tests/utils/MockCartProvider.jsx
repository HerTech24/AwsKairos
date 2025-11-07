import React, { useMemo } from "react"; // 1. Importar useMemo
import { CartContext } from "../../context/CartContext";

/**
 * MockCartProvider - Proveedor simulado para pruebas
 * Permite inyectar un valor de contexto controlado durante los tests.
 * Compatible con Karma + Jasmine + React Testing Library
 */
const MockCartProvider = ({ children, cartValue = {} }) => {
  
  // 2. Usar useMemo para crear un valor estable
  // Este objeto solo se recalculará si la prop 'cartValue' cambia.
  const providerValue = useMemo(() => ({
    // Valores por defecto
    cartItems: [],
    addToCart: jasmine.createSpy("default.addToCart"),
    removeFromCart: jasmine.createSpy("default.removeFromCart"),
    toggleCart: jasmine.createSpy("default.toggleCart"),
    isCartOpen: false,
    
    // 3. Sobrescribir con los valores específicos del test
    ...cartValue, 
  }), [cartValue]); // Dependencia: solo cambia si 'cartValue' cambia

  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  );
};

export default MockCartProvider;