// src/tests/components/Navbar.spec.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

// Mock de dependencias
jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    }));
    jest.mock("../../context/CarritoContext");

    describe("Navbar Component", () => {
    let mockLogin, mockLogout, mockToggleCart;

    beforeEach(() => {
        mockLogin = jasmine.createSpy("loginWithRedirect");
        mockLogout = jasmine.createSpy("logout");
        mockToggleCart = jasmine.createSpy("toggleCart");

        useAuth0.and.returnValue({
        isAuthenticated: false,
        user: { name: "Test User" },
        loginWithRedirect: mockLogin,
        logout: mockLogout,
        });

        useCarrito.and.returnValue({
        carrito: [],
        toggleCart: mockToggleCart,
        });
    });

    it("renderiza el nombre del sitio", () => {
        render(<Navbar />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Kairos Coffee/i)).toBeTruthy();
    });

    it("muestra botones de inicio de sesión y registro cuando no autenticado", () => {
        render(<Navbar />, { wrapper: MemoryRouter });
        expect(screen.getByText(/REGISTRARSE/i)).toBeTruthy();
        expect(screen.getByText(/INICIAR SESIÓN/i)).toBeTruthy();
    });

    it("ejecuta loginWithRedirect al hacer clic en iniciar sesión", () => {
        render(<Navbar />, { wrapper: MemoryRouter });
        fireEvent.click(screen.getByText(/INICIAR SESIÓN/i));
        expect(mockLogin).toHaveBeenCalled();
    });

    it("ejecuta toggleCart al hacer clic en el botón del carrito", () => {
        render(<Navbar />, { wrapper: MemoryRouter });
        const cartButton = screen.getByRole("button", { name: /Abrir carrito/i });
        fireEvent.click(cartButton);
        expect(mockToggleCart).toHaveBeenCalled();
    });

    it("muestra el saludo cuando el usuario está autenticado", () => {
        useAuth0.and.returnValue({
        isAuthenticated: true,
        user: { name: "Carlos" },
        logout: mockLogout,
        loginWithRedirect: mockLogin,
        });

        render(<Navbar />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Hola, Carlos/i)).toBeTruthy();
    });
});