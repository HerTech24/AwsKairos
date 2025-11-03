import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => setCarrito([...carrito, producto]);
  const eliminarProducto = (index) => setCarrito(carrito.filter((_, i) => i !== index));

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto }}>
      {children}
    </CarritoContext.Provider>
  );
};
