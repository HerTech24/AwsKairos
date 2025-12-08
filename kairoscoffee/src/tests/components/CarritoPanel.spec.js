// ==========================================
// src/tests/components/CarritoPanel.spec.js
// 100% JASMINE - SIN JEST
// ==========================================
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CarritoPanel from "../../components/CarritoPanel";
import { CarritoContext } from "../../context/CarritoContext";

describe("🛒 CarritoPanel Component", () => {
    let mockContext;

    beforeEach(() => {
        mockContext = {
        carrito: [],
        eliminarProducto: jasmine.createSpy("eliminarProducto"),
        updateQuantity: jasmine.createSpy("updateQuantity"),
        isCartOpen: false,
        toggleCart: jasmine.createSpy("toggleCart")
        };
    });

    const renderPanel = (customContext = {}) => {
        const ctx = { ...mockContext, ...customContext };
        return render(
        <CarritoContext.Provider value={ctx}>
            <BrowserRouter>
            <CarritoPanel />
            </BrowserRouter>
        </CarritoContext.Provider>
        );
    };

    it("Renderiza header", () => {
        renderPanel();
        expect(screen.getByText("Carrito")).toBeTruthy();
    });

    it("Renderiza botón cerrar", () => {
        renderPanel();
        expect(screen.getByLabelText("Cerrar carrito")).toBeTruthy();
    });

    it("Panel cerrado no tiene clase active", () => {
        const { container } = renderPanel({ isCartOpen: false });
        expect(container.querySelector(".carrito-panel").classList.contains("active")).toBe(false);
    });

    it("Panel abierto tiene clase active", () => {
        const { container } = renderPanel({ isCartOpen: true });
        expect(container.querySelector(".carrito-panel").classList.contains("active")).toBe(true);
    });

    it("Carrito vacío muestra mensaje", () => {
        renderPanel({ carrito: [] });
        expect(screen.getByText("El carrito está vacío")).toBeTruthy();
    });

    it("Carrito vacío no muestra lista", () => {
        const { container } = renderPanel({ carrito: [] });
        expect(container.querySelector(".lista-carrito")).toBeNull();
    });

    it("Carrito con items no muestra mensaje vacío", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 2, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.queryByText("El carrito está vacío")).toBeNull();
    });

    it("Renderiza items del carrito", () => {
        const items = [
        { id: 1, nombre: "Café Espresso", precio: 5000, quantity: 2, imagen: "esp.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("Café Espresso")).toBeTruthy();
    });

    it("Item con imagen renderiza img", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 1, imagen: "test.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByAltText("Café")).toBeTruthy();
    });

    it("Item sin imagen no renderiza img", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 1 }
        ];
        renderPanel({ carrito: items });
        expect(screen.queryByAltText("Café")).toBeNull();
    });

    it("Muestra precio unitario", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 2, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("$5.000 c/u")).toBeTruthy();
    });

    it("Calcula subtotal correcto", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 3, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("Subtotal: $15.000")).toBeTruthy();
    });

    it("Calcula total de múltiples items", () => {
        const items = [
        { id: 1, nombre: "A", precio: 5000, quantity: 2, imagen: "a.jpg" },
        { id: 2, nombre: "B", precio: 3000, quantity: 3, imagen: "b.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("Total: $19.000")).toBeTruthy();
    });

    it("Item sin precio usa 0", () => {
        const items = [
        { id: 1, nombre: "Item", quantity: 2, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("Total: $0")).toBeTruthy();
    });

    it("Item sin quantity usa 1", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("Total: $5.000")).toBeTruthy();
    });

    it("Click en cerrar llama toggleCart", () => {
        renderPanel({ isCartOpen: true });
        fireEvent.click(screen.getByLabelText("Cerrar carrito"));
        expect(mockContext.toggleCart).toHaveBeenCalled();
    });

    it("Click en eliminar llama eliminarProducto", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 1, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        fireEvent.click(screen.getByText("🗑️"));
        expect(mockContext.eliminarProducto).toHaveBeenCalledWith(0);
    });

    it("Click en decrementar llama updateQuantity", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 3, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        fireEvent.click(screen.getByText("–"));
        expect(mockContext.updateQuantity).toHaveBeenCalledWith(1, 2);
    });

    it("Decrementar con quantity 1 usa Math.max", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 1, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        fireEvent.click(screen.getByText("–"));
        expect(mockContext.updateQuantity).toHaveBeenCalledWith(1, 1);
    });

    it("Botón decrementar disabled cuando quantity es 1", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 1, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("–").disabled).toBe(true);
    });

    it("Botón decrementar enabled cuando quantity > 1", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 2, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("–").disabled).toBe(false);
    });

    it("Click en incrementar llama updateQuantity", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 2, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        fireEvent.click(screen.getByText("+"));
        expect(mockContext.updateQuantity).toHaveBeenCalledWith(1, 3);
    });

    it("Renderiza múltiples items", () => {
        const items = [
        { id: 1, nombre: "A", precio: 5000, quantity: 1, imagen: "a.jpg" },
        { id: 2, nombre: "B", precio: 3000, quantity: 2, imagen: "b.jpg" }
        ];
        renderPanel({ carrito: items });
        
        const btnsIncrementar = screen.getAllByText("+");
        fireEvent.click(btnsIncrementar[0]);
        expect(mockContext.updateQuantity).toHaveBeenCalledWith(1, 2);
    });

    it("Click en Ir al Checkout", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 1, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        
        const btnCheckout = screen.getByText("Ir al Checkout");
        fireEvent.click(btnCheckout);
        
        expect(mockContext.toggleCart).toHaveBeenCalled();
    });

    it("Renderiza quantity en display", () => {
        const items = [
        { id: 1, nombre: "Café", precio: 5000, quantity: 7, imagen: "img.jpg" }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("7")).toBeTruthy();
    });

    it("Items sin imagen múltiples", () => {
        const items = [
        { id: 1, nombre: "A", precio: 5000, quantity: 1 },
        { id: 2, nombre: "B", precio: 3000, quantity: 2 }
        ];
        renderPanel({ carrito: items });
        expect(screen.getByText("A")).toBeTruthy();
        expect(screen.queryByRole("img")).toBeNull();
    });
});