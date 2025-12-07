import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CarritoPanel from "../../components/CarritoPanel"; // Verifica la ruta
import { CarritoContext } from "../../context/CarritoContext";
import { BrowserRouter } from "react-router-dom";

describe("🛒 CarritoPanel Component (100% Coverage)", () => {
    let mockContext;
    let mockToggleCart, mockEliminar, mockUpdate;

    beforeEach(() => {
        mockToggleCart = jasmine.createSpy("toggleCart");
        mockEliminar = jasmine.createSpy("eliminarProducto");
        mockUpdate = jasmine.createSpy("updateQuantity");
    });

    const renderCarrito = (carritoData = []) => {
        mockContext = {
        carrito: carritoData,
        isCartOpen: true, // Forzamos abierto para ver el contenido
        toggleCart: mockToggleCart,
        eliminarProducto: mockEliminar,
        updateQuantity: mockUpdate
        };

        return render(
        <CarritoContext.Provider value={mockContext}>
            <BrowserRouter>
            <CarritoPanel />
            </BrowserRouter>
        </CarritoContext.Provider>
        );
    };

    it("muestra mensaje de vacío si no hay productos", () => {
        renderCarrito([]);
        expect(screen.getByText("El carrito está vacío")).toBeTruthy();
    });

    it("calcula totales y renderiza items con valores por defecto (Branch Coverage)", () => {
        // Probamos item sin imagen y sin cantidad definida (usa || 1)
        const items = [
        { id: 1, nombre: "Café Test", precio: 1000 }, // quantity undefined -> 1
        { id: 2, nombre: "Té Test", precio: 2000, quantity: 2, imagen: "img.png" }
        ];
        renderCarrito(items);

        // Verificar nombres
        expect(screen.getByText("Café Test")).toBeTruthy();
        
        // Verificar cálculo total: (1000 * 1) + (2000 * 2) = 5000
        // Ajusta el string según tu formato de moneda (es-CL usa puntos)
        expect(screen.getByText((content) => content.includes("5.000"))).toBeTruthy();
        
        // Verificar que item sin imagen no renderiza tag img (Branch coverage)
        const imagenes = screen.getAllByRole("img");
        expect(imagenes.length).toBe(1); // Solo la del Té
    });

    it("llama a updateQuantity al incrementar y decrementar", () => {
        const items = [{ id: 1, nombre: "Café", precio: 1000, quantity: 2 }];
        renderCarrito(items);

        const btnMenos = screen.getByText("–");
        const btnMas = screen.getByText("+");

        fireEvent.click(btnMenos);
        expect(mockUpdate).toHaveBeenCalledWith(1, 1); // 2 - 1

        fireEvent.click(btnMas);
        expect(mockUpdate).toHaveBeenCalledWith(1, 3); // 2 + 1
    });

    it("deshabilita el botón de decrementar si cantidad es <= 1", () => {
        const items = [{ id: 1, nombre: "Café", precio: 1000, quantity: 1 }];
        renderCarrito(items);

        const btnMenos = screen.getByText("–");
        expect(btnMenos.disabled).toBe(true);
        
        // Intentar clickear igual para asegurar branch coverage del Math.max
        fireEvent.click(btnMenos);
        // Aunque esté disabled en UI, si el handler se disparara:
        // Math.max(1, 1-1) = 1.
    });

    it("elimina producto al hacer click en el basurero", () => {
        renderCarrito([{ id: 1, nombre: "Café", precio: 1000 }]);
        const btnEliminar = screen.getByText("🗑️");
        fireEvent.click(btnEliminar);
        expect(mockEliminar).toHaveBeenCalledWith(0); // Index 0
    });

    it("navega al checkout y cierra carrito", () => {
        renderCarrito([{ id: 1, precio: 100 }]);
        const btnCheckout = screen.getByText("Ir al Checkout");
        fireEvent.click(btnCheckout);
        
        expect(mockToggleCart).toHaveBeenCalled();
        // La navegación real la maneja el Router, aquí solo verificamos que no explote
    });
});