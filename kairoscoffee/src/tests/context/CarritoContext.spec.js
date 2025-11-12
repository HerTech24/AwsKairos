// src/tests/context/CarritoContext.spec.js
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "../../context/CarritoContext";

describe("CarritoContext (Karma + Jasmine)", () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;

    beforeEach(() => {
        localStorage.clear();
    });

    it("agrega un producto al carrito", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        const producto = { id: 1, nombre: "Café", precio: 10 };

        act(() => result.current.agregarProducto(producto));

        expect(result.current.carrito.length).toBe(1);
        expect(result.current.carrito[0].quantity).toBe(1);
    });

    it("incrementa la cantidad de un producto existente", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        const producto = { id: 1, nombre: "Café", precio: 10 };

        act(() => result.current.agregarProducto(producto));
        act(() => result.current.agregarProducto(producto));

        expect(result.current.carrito[0].quantity).toBe(2);
    });

    it("maneja productos sin quantity inicial (usa 1 por defecto)", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        const producto = { id: 1, nombre: "Café", precio: 10, quantity: undefined };

        act(() => result.current.agregarProducto(producto));
        act(() => result.current.agregarProducto(producto));

        // Primera vez: quantity = 1, segunda vez: (undefined || 1) + 1 = 2
        expect(result.current.carrito[0].quantity).toBe(2);
    });

    it("actualiza la cantidad de un producto", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        const producto = { id: 1, nombre: "Café", precio: 10 };

        act(() => result.current.agregarProducto(producto));
        act(() => result.current.updateQuantity(1, 5));

        expect(result.current.carrito[0].quantity).toBe(5);
    });

    it("elimina un producto por ID", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        const producto = { id: 1, nombre: "Café", precio: 10 };

        act(() => result.current.agregarProducto(producto));
        act(() => result.current.removeFromCart(1));

        expect(result.current.carrito.length).toBe(0);
    });

    it("elimina un producto por índice", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        const producto = { id: 1, nombre: "Café", precio: 10 };

        act(() => result.current.agregarProducto(producto));
        act(() => result.current.eliminarProducto(0));

        expect(result.current.carrito.length).toBe(0);
    });

    it("vacía completamente el carrito", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        const producto1 = { id: 1, nombre: "Café", precio: 10 };
        const producto2 = { id: 2, nombre: "Té", precio: 5 };

        act(() => {
        result.current.agregarProducto(producto1);
        result.current.agregarProducto(producto2);
        });

        expect(result.current.carrito.length).toBe(2);

        act(() => result.current.vaciarCarrito());

        expect(result.current.carrito.length).toBe(0);
    });

    it("abre y cierra el carrito con toggleCart", () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });

        expect(result.current.isCartOpen).toBe(false);

        act(() => result.current.toggleCart());
        expect(result.current.isCartOpen).toBe(true);

        act(() => result.current.toggleCart());
        expect(result.current.isCartOpen).toBe(false);
    });

    it("carga el carrito desde localStorage al iniciar", () => {
        const savedCart = [{ id: 1, nombre: "Café guardado", precio: 10, quantity: 2 }];
        localStorage.setItem("carrito", JSON.stringify(savedCart));

        const { result } = renderHook(() => useCarrito(), { wrapper });

        expect(result.current.carrito.length).toBe(1);
        expect(result.current.carrito[0].nombre).toBe("Café guardado");
    });
});