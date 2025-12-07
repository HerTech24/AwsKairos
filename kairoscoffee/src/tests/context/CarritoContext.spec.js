import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "../../context/CarritoContext";

describe("🛒 CarritoContext (Cobertura Total)", () => {
  const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;

  beforeEach(() => {
    localStorage.clear();
    
    // Configuración segura de Spies para evitar errores de Jasmine
    if (!jasmine.isSpy(localStorage.getItem)) spyOn(localStorage, "getItem").and.callThrough();
    if (!jasmine.isSpy(localStorage.setItem)) spyOn(localStorage, "setItem").and.callThrough();
    if (!jasmine.isSpy(localStorage.removeItem)) spyOn(localStorage, "removeItem").and.callThrough();
    if (!jasmine.isSpy(console.error)) spyOn(console, "error");
  });

  // --- BRANCHES DE CARGA (localStorage) ---
  
  it("Branch: Inicia vacío si localStorage es null", () => {
    localStorage.getItem.and.returnValue(null);
    const { result } = renderHook(() => useCarrito(), { wrapper });
    expect(result.current.carrito).toEqual([]);
  });

  it("Branch: Catch error si el JSON es inválido", () => {
    localStorage.getItem.and.returnValue("JSON_INVALIDO_{");
    const { result } = renderHook(() => useCarrito(), { wrapper });
    expect(result.current.carrito).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  // --- BRANCHES DE CÁLCULO (|| 0 y || 1) ---

  it("Branch: Fallback a precio 0 y quantity 1", () => {
    // Inyectamos item sin precio ni cantidad via localStorage para forzar los operadores ||
    const itemRoto = [{ id: 99, nombre: "Item Roto" }]; 
    localStorage.getItem.and.returnValue(JSON.stringify(itemRoto));

    const { result } = renderHook(() => useCarrito(), { wrapper });

    // (undefined || 0) * (undefined || 1) = 0
    expect(result.current.getCartTotal()).toBe(0);
    // (undefined || 1) = 1
    expect(result.current.getCartItemsCount()).toBe(1);
  });

  // --- LÓGICA DE NEGOCIO ---

  it("Agrega producto (Else)", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    act(() => result.current.agregarProducto({ id: 1, precio: 100 }));
    expect(result.current.carrito.length).toBe(1);
  });

  it("Incrementa cantidad (If)", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    const prod = { id: 1, precio: 100 };
    act(() => result.current.agregarProducto(prod));
    act(() => result.current.agregarProducto(prod));
    expect(result.current.carrito[0].quantity).toBe(2);
  });

  it("Elimina producto por índice", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    act(() => { result.current.agregarProducto({ id: 10 }); });
    act(() => { result.current.agregarProducto({ id: 20 }); });

    act(() => { result.current.eliminarProducto(0); });

    expect(result.current.carrito.length).toBe(1);
    expect(result.current.carrito[0].id).toBe(20);
  });

  it("updateQuantity elimina si < 1", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    act(() => result.current.agregarProducto({ id: 1 }));
    act(() => result.current.updateQuantity(1, 0));
    expect(result.current.carrito.length).toBe(0);
  });

  it("updateQuantity actualiza normal", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    act(() => result.current.agregarProducto({ id: 1 }));
    act(() => result.current.updateQuantity(1, 5));
    expect(result.current.carrito[0].quantity).toBe(5);
  });

  it("ClearCart, ToggleCart y SetIsCartOpen", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    act(() => result.current.toggleCart());
    expect(result.current.isCartOpen).toBe(true);
    
    act(() => result.current.setIsCartOpen(false));
    expect(result.current.isCartOpen).toBe(false);

    act(() => result.current.agregarProducto({ id: 1 }));
    act(() => result.current.clearCart());
    expect(result.current.carrito.length).toBe(0);
  });
});