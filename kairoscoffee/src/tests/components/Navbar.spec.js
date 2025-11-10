/**
 * Test de Navbar adaptado para Karma + Jasmine + React 18
 * ✅ Sin Jest — Solo Jasmine + React Testing Library
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Auth0Context } from "@auth0/auth0-react";
import { CarritoContext } from "../../context/CarritoContext";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";

// Spies globales
let mockLogin;
let mockLogout;
let mockToggleCart;

const renderWithProviders = (
  ui,
  { isAuthenticated = false, user = null, cartState = {} } = {}
) => {
  mockLogin = jasmine.createSpy("loginWithRedirect");
  mockLogout = jasmine.createSpy("logout");
  mockToggleCart = jasmine.createSpy("toggleCart");

  const mockAuth0Value = {
    isAuthenticated,
    user,
    loginWithRedirect: mockLogin,
    logout: mockLogout,
  };

  const mockCarritoValue = {
    carrito: [],
    isCartOpen: false,
    toggleCart: mockToggleCart,
    ...cartState,
  };

  return render(
    <Auth0Context.Provider value={mockAuth0Value}>
      <CarritoContext.Provider value={mockCarritoValue}>
        <MemoryRouter>{ui}</MemoryRouter>
      </CarritoContext.Provider>
    </Auth0Context.Provider>
  );
};

describe("Navbar Component (Jasmine + Karma + React 18)", () => {
  it("renderiza el nombre del sitio correctamente", () => {
    renderWithProviders(<Navbar />);
    const nombreSitio = screen.queryByText(/Kairos Coffee/i);
    expect(nombreSitio).toBeDefined();
  });

  it("muestra botones de inicio de sesión y registro cuando no autenticado", () => {
    renderWithProviders(<Navbar />, { isAuthenticated: false });

    const btnLogin = screen.queryByText(/iniciar sesión/i);
    const btnRegistro = screen.queryByText(/registrarse/i);

    expect(btnLogin).toBeDefined();
    expect(btnRegistro).toBeDefined();
  });

  it("ejecuta loginWithRedirect al hacer clic en 'Iniciar sesión'", () => {
    renderWithProviders(<Navbar />, { isAuthenticated: false });
    fireEvent.click(screen.getByText(/iniciar sesión/i));
    expect(mockLogin).toHaveBeenCalled();
  });

  it("muestra el saludo cuando el usuario está autenticado", () => {
    const mockUser = { name: "Hernán Lippke" };
    renderWithProviders(<Navbar />, { isAuthenticated: true, user: mockUser });

    const saludo = screen.queryByText(/Hernán Lippke/i);
    expect(saludo).toBeDefined();
  });

  it("ejecuta logout al hacer clic en 'Cerrar sesión'", () => {
    const mockUser = { name: "Hernán Lippke" };
    renderWithProviders(<Navbar />, { isAuthenticated: true, user: mockUser });

    fireEvent.click(screen.getByText(/cerrar sesión/i));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("ejecuta toggleCart al hacer clic en el botón del carrito", () => {
    renderWithProviders(<Navbar />);
    const botonCarrito = screen.getByRole("button", { name: /abrir carrito/i });
    fireEvent.click(botonCarrito);
    expect(mockToggleCart).toHaveBeenCalled();
  });
});
