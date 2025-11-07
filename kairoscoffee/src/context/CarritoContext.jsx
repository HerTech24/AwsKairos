import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ ÚNICO CAMBIO REQUERIDO:
// Añadimos 'export' para que los tests puedan importar el Contexto.
export const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("carrito");
    if (stored) setCarrito(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (nuevoProducto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === nuevoProducto.id);

      if (existe) {
        return prevCarrito.map((item) =>
          item.id === nuevoProducto.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prevCarrito, { ...nuevoProducto, quantity: 1 }];
    });
  };

  const updateQuantity = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: nuevaCantidad } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const eliminarProducto = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        updateQuantity,
        removeFromCart,
        eliminarProducto,
        vaciarCarrito,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};