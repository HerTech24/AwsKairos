/**
 * Test de Navbar adaptado para Karma + Jasmine + React 18
 * Compatible con @testing-library/react y Auth0
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// 🔥 Mock manual de @auth0/auth0-react para Karma + Jasmine (sin Jest)
let mockLogin, mockLogout, mockUser, mockIsAuthenticated;

// Creamos un objeto que emula el módulo
const mockAuth0 = {
  useAuth0: () => ({
    isAuthenticated: mockIsAuthenticated,
    user: mockUser,
    loginWithRedirect: mockLogin,
    logout: mockLogout,
  }),
};

// Registramos el mock globalmente ANTES de importar el componente
// Esto sobrescribe la importación ESM para el bundle de Webpack/Karma
// eslint-disable-next-line no-undef
__webpack_require__.c[
  __webpack_require__.resolve
    ? __webpack_require__.resolve("@auth0/auth0-react")
    : Object.keys(__webpack_require__.c).find((k) =>
        k.includes("@auth0/auth0-react")
      )
] = { exports: mockAuth0 };

import Navbar from "../../components/Navbar";

describe("Navbar Component (adaptado a Jasmine y Karma)", () => {
  beforeEach(() => {
    mockLogin = jasmine.createSpy("loginWithRedirect");
    mockLogout = jasmine.createSpy("logout");
    mockUser = null;
    mockIsAuthenticated = false;
  });

  // ============================================================================
  // TESTS DE RENDERIZADO
  // ============================================================================
  it("renderiza el nombre del sitio correctamente", () => {
    render(<Navbar />);
    expect(screen.getByText(/Kairos Coffee/i)).toBeTruthy();
  });

  it("muestra botones de inicio de sesión y registro cuando no autenticado", () => {
    render(<Navbar />);
    expect(screen.getByText("Iniciar sesión")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
  });

  it("ejecuta loginWithRedirect al hacer clic en 'Iniciar sesión'", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText("Iniciar sesión"));
    expect(mockLogin).toHaveBeenCalled();
  });

  // ============================================================================
  // TESTS CON USUARIO AUTENTICADO
  // ============================================================================
  it("muestra el saludo cuando el usuario está autenticado", () => {
    mockIsAuthenticated = true;
    mockUser = { name: "Hernán Lippke" };

    render(<Navbar />);
    expect(screen.getByText(/Hola, Hernán Lippke/i)).toBeTruthy();
  });

  it("ejecuta logout al hacer clic en 'Cerrar sesión'", () => {
    mockIsAuthenticated = true;
    mockUser = { name: "Hernán Lippke" };

    render(<Navbar />);
    fireEvent.click(screen.getByText("Cerrar sesión"));
    expect(mockLogout).toHaveBeenCalled();
  });

  // ============================================================================
  // TEST DEL BOTÓN DEL CARRITO
  // ============================================================================
  it("ejecuta toggleCart al hacer clic en el botón del carrito", () => {
    const toggleCart = jasmine.createSpy("toggleCart");
    render(<Navbar toggleCart={toggleCart} carrito={[]} />);

    const botonCarrito =
      screen.getByRole("button", { name: /carrito/i }) ||
      screen.getByText(/carrito/i);
    fireEvent.click(botonCarrito);
    expect(toggleCart).toHaveBeenCalled();
  });
});
