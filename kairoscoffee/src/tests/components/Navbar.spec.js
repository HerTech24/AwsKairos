/**
 * Test de Navbar adaptado para Karma + Jasmine + React 18
 * * ✅ VERSIÓN DEFINITIVA:
 * Mockea los 3 contextos requeridos (Auth0, Carrito, Router)
 * usando sus .Provider directos, sin lógica externa.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// 1. Importar los CONTEXTOS, no los Providers
import { Auth0Context } from "@auth0/auth0-react";
import { CarritoContext } from "../../context/CarritoContext"; 
import { MemoryRouter } from 'react-router-dom';

import Navbar from "../../components/Navbar";

// Spies de Jasmine (definidos fuera del helper)
let mockLogin;
let mockLogout;
let mockToggleCart;

/**
 * 3. Crea tu "Helper de Render"
 * Esta función envuelve el componente en TODOS los providers que necesita.
 */
const renderWithProviders = (
  ui,
  {
    isAuthenticated = false,
    user = null,
    cartState = {}, 
  } = {}
) => {
  // 2. Crear los spies NUEVOS para cada test
  mockLogin = jasmine.createSpy("loginWithRedirect");
  mockLogout = jasmine.createSpy("logout");
  mockToggleCart = jasmine.createSpy("toggleCart");

  // 3. Crear el valor mock para Auth0Context
  // ESTO EVITA EL 'full page reload'
  const mockAuth0Value = {
    isAuthenticated,
    user,
    loginWithRedirect: mockLogin,
    logout: mockLogout,
  };

  // 4. Crear el valor mock para CarritoContext
  const mockCarritoValue = {
    carrito: [],
    isCartOpen: false,
    toggleCart: mockToggleCart,
    ...cartState, 
  };

  // 5. Renderizar con los .Provider de contexto mockeados
  return render(
    <Auth0Context.Provider value={mockAuth0Value}>
      <CarritoContext.Provider value={mockCarritoValue}>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </CarritoContext.Provider>
    </Auth0Context.Provider>
  );
};


describe("Navbar Component (adaptado a Jasmine y Karma)", () => {

  it("renderiza el nombre del sitio correctamente", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Kairos Coffee/i)).toBeInTheDocument();
  });

  it("muestra botones de inicio de sesión y registro cuando no autenticado", () => {
    renderWithProviders(<Navbar />, { isAuthenticated: false });
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
  });

  it("ejecuta loginWithRedirect al hacer clic en 'Iniciar sesión'", () => {
    renderWithProviders(<Navbar />, { isAuthenticated: false });
    
    fireEvent.click(screen.getByText(/iniciar sesión/i));
    
    // Ahora 'mockLogin' es el spy que pasamos al contexto
    expect(mockLogin).toHaveBeenCalled();
  });

  it("muestra el saludo cuando el usuario está autenticado", () => {
    const mockUser = { name: "Hernán Lippke" };
    renderWithProviders(<Navbar />, {
      isAuthenticated: true,
      user: mockUser,
    });
    expect(screen.getByText(/Hola, Hernán Lippke/i)).toBeInTheDocument();
  });

  it("ejecuta logout al hacer clic en 'Cerrar sesión'", () => {
    const mockUser = { name: "Hernán Lippke" };
    renderWithProviders(<Navbar />, {
      isAuthenticated: true,
      user: mockUser,
    });
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