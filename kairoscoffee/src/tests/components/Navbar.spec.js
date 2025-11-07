/**
 * Test de Navbar adaptado para Karma + Jasmine + React 18
 * Usando el patrón "wrapper" para mockear contextos (Auth0 y Cart)
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// 1. Importa el provider REAL de Auth0 y tu MOCK de Cart
import { Auth0Provider } from "@auth0/auth0-react";
import { MockCartProvider } from "../utils/MockCartProvider"; // ¡Asegúrate que la ruta sea correcta!
import Navbar from "../../components/Navbar";

// 2. Define tus spies de Jasmine en un scope global del describe
let mockLogin;
let mockLogout;
let mockToggleCart; // Spy para el carrito

/**
 * 3. Crea tu "Helper de Render"
 * Esta función envuelve el componente en TODOS los providers que necesita.
 * Podemos pasarle estado inicial a los mocks.
 */
const renderWithProviders = (
  ui,
  {
    isAuthenticated = false,
    user = null,
    cartState = { carrito: [], toggleCart: mockToggleCart },
  } = {}
) => {
  // Reiniciamos los spies aquí para que estén listos para cada test
  mockLogin = jasmine.createSpy("loginWithRedirect");
  mockLogout = jasmine.createSpy("logout");

  // Si no se pasa un spy, creamos uno por defecto
  if (!cartState.toggleCart) {
    cartState.toggleCart = jasmine.createSpy("toggleCart");
  }
  mockToggleCart = cartState.toggleCart; // Actualizamos la referencia global

  // 👇 Aquí está la magia:
  // En lugar de mockear el 'import', mockeamos el 'Provider'
  // dándole un estado falso y spies falsos.
  return render(
    <Auth0Provider
      domain="mock.auth0.com"
      clientId="mock_client_id"
      authorizationParams={{ redirect_uri: window.location.origin }}
      // Sobrescribimos el estado interno para este test
      useAuth0={() => ({
        isAuthenticated: isAuthenticated,
        user: user,
        loginWithRedirect: mockLogin,
        logout: mockLogout,
      })}
    >
      <MockCartProvider {...cartState}>{ui}</MockCartProvider>
    </Auth0Provider>
  );
};

// 4. Tus tests ahora son limpios y legibles
describe("Navbar Component (adaptado a Jasmine y Karma)", () => {
  // No necesitas beforeEach/afterEach para resetear spies
  // si 'renderWithProviders' los crea nuevos cada vez.

  it("renderiza el nombre del sitio correctamente", () => {
    renderWithProviders(<Navbar />);
    // ✅ Mejor asersión: usa .toBeInTheDocument() (de jasmine-dom)
    expect(screen.getByText(/Kairos Coffee/i)).toBeInTheDocument();
  });

  it("muestra botones de inicio de sesión y registro cuando no autenticado", () => {
    renderWithProviders(<Navbar />, { isAuthenticated: false });
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("ejecuta loginWithRedirect al hacer clic en 'Iniciar sesión'", () => {
    renderWithProviders(<Navbar />, { isAuthenticated: false });
    fireEvent.click(screen.getByText("Iniciar sesión"));
    
    // ✅ Asersión correcta
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

    fireEvent.click(screen.getByText("Cerrar sesión"));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("ejecuta toggleCart al hacer clic en el botón del carrito", () => {
    // El spy se crea y pasa automáticamente por nuestro helper
    renderWithProviders(<Navbar />);

    const botonCarrito =
      screen.getByRole("button", { name: /carrito/i }) ||
      screen.getByText(/carrito/i);
    
    fireEvent.click(botonCarrito);
    
    // Verificamos el spy que nuestro helper creó
    expect(mockToggleCart).toHaveBeenCalled();
  });
});