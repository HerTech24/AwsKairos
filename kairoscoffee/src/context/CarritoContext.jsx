import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("kairosCart");
    if (savedCart) {
      try {
        setCarrito(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("kairosCart", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto) => {
    // Buscar si el producto ya existe en el carrito
    const existente = carrito.find((item) => item.id === producto.id);
    
    if (existente) {
      // Si existe, aumentar cantidad
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      // Si no existe, agregarlo con cantidad 1
      setCarrito([...carrito, { ...producto, quantity: 1 }]);
    }
  };

  const eliminarProducto = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Si la cantidad es 0, eliminar el producto
      setCarrito(carrito.filter((item) => item.id !== productId));
      return;
    }
    setCarrito(
      carrito.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCarrito([]);
    localStorage.removeItem("kairosCart");
  };

  const getCartTotal = () => {
    return carrito.reduce(
      (total, item) => total + (item.precio || 0) * (item.quantity || 1),
      0
    );
  };

  const getCartItemsCount = () => {
    return carrito.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        isCartOpen,
        toggleCart,
        setIsCartOpen,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};