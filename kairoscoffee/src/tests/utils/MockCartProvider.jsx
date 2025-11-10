import React, { useMemo } from "react";
import { CartContext } from "../../context/CartContext";

const MockCartProvider = ({ children, cartValue = {} }) => {
  const providerValue = useMemo(() => ({
    cartItems: [],
    addToCart: jasmine.createSpy("mock.addToCart"),
    removeFromCart: jasmine.createSpy("mock.removeFromCart"),
    toggleCart: jasmine.createSpy("mock.toggleCart"),
    isCartOpen: false,
    ...cartValue
  }), [cartValue]);

  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  );
};

export default MockCartProvider;
