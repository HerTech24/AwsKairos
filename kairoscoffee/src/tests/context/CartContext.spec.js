import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../../context/CartContext";

describe("CartContext (adaptado a Karma + Jasmine)", () => {
  // Wrapper que provee el contexto
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega un producto al carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto));

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].nombre).toBe("Café");
  });

  it("actualiza la cantidad de un producto existente", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto));
    act(() => result.current.addToCart(producto));

    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it("elimina un producto del carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto));
    act(() => result.current.removeFromCart(1));

    expect(result.current.cartItems.length).toBe(0);
  });

  it("limpia todo el carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto));
    act(() => result.current.clearCart());

    expect(result.current.cartItems.length).toBe(0);
  });

  it("calcula el total del carrito correctamente", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto, 3));
    const total = result.current.getCartTotal();

    expect(total).toBe(30);
  });

  it("cambia el estado de visibilidad del carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.toggleCart());
    expect(result.current.isCartOpen).toBe(true);
  });
});
