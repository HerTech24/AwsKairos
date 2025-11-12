// src/tests/context/CartContext.spec.js
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../../context/CartContext";

describe("CartContext (adaptado a Karma + Jasmine)", () => {
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

  // ✅ TESTS PARA BRANCHES FALTANTES

  it("actualiza la cantidad de un producto usando updateQuantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto, 1));
    act(() => result.current.updateQuantity(1, 5));

    expect(result.current.cartItems[0].quantity).toBe(5);
  });

  it("elimina el producto cuando updateQuantity recibe 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto, 1));
    act(() => result.current.updateQuantity(1, 0));

    expect(result.current.cartItems.length).toBe(0);
  });

  it("elimina el producto cuando updateQuantity recibe cantidad negativa", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Café", precio: 10 };

    act(() => result.current.addToCart(producto, 1));
    act(() => result.current.updateQuantity(1, -5));

    expect(result.current.cartItems.length).toBe(0);
  });

  it("calcula el total usando 'price' cuando 'precio' no existe", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto = { id: 1, nombre: "Té", price: 15 }; // 'price' en vez de 'precio'

    act(() => result.current.addToCart(producto, 2));
    const total = result.current.getCartTotal();

    expect(total).toBe(30);
  });

  it("calcula correctamente el conteo total de items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const producto1 = { id: 1, nombre: "Café", precio: 10 };
    const producto2 = { id: 2, nombre: "Té", precio: 5 };

    act(() => {
      result.current.addToCart(producto1, 3);
      result.current.addToCart(producto2, 2);
    });

    expect(result.current.getCartItemsCount()).toBe(5);
  });

  it("setIsCartOpen cambia directamente el estado del carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.setIsCartOpen(true));
    expect(result.current.isCartOpen).toBe(true);

    act(() => result.current.setIsCartOpen(false));
    expect(result.current.isCartOpen).toBe(false);
  });

  it("carga el carrito desde localStorage al iniciar", () => {
    const savedCart = [{ id: 1, nombre: "Café guardado", precio: 10, quantity: 2 }];
    localStorage.setItem("kairosCart", JSON.stringify(savedCart));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].nombre).toBe("Café guardado");
  });
});