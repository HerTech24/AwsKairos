// src/tests/components/Navbar.spec.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";

describe("🧩 Navbar Component (Karma + Jasmine + React 18)", () => {
  let mockLoginWithRedirect, mockLogout, mockToggleCart, mockProfileClick, mockNavigate;
  let mockAuth0Hook, mockCarritoHook;

  beforeEach(() => {
    mockLoginWithRedirect = jasmine.createSpy("loginWithRedirect");
    mockLogout = jasmine.createSpy("logout");
    mockToggleCart = jasmine.createSpy("toggleCart");
    mockProfileClick = jasmine.createSpy("onProfileClick");
    mockNavigate = jasmine.createSpy("navigate");

    mockAuth0Hook = {
      isAuthenticated: false,
      user: null,
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout
    };

    mockCarritoHook = {
      carrito: [],
      toggleCart: mockToggleCart
    };
  });

  afterEach(() => {
    mockLoginWithRedirect.calls.reset();
    mockLogout.calls.reset();
    mockToggleCart.calls.reset();
    mockProfileClick.calls.reset();
    mockNavigate.calls.reset();
  });

  const renderNavbar = (authOverrides = {}, carritoOverrides = {}) => {
    const auth0 = { ...mockAuth0Hook, ...authOverrides };
    const carrito = { ...mockCarritoHook, ...carritoOverrides };

    return render(
      <BrowserRouter>
        <Navbar 
          onProfileClick={mockProfileClick}
          auth0Hook={auth0}
          carritoHook={carrito}
          navigateHook={mockNavigate}
        />
      </BrowserRouter>
    );
  };

  it("renderiza el nombre del sitio correctamente", () => {
    renderNavbar();
    expect(screen.getByText(/kairos coffee/i)).toBeTruthy();
  });

  it("ejecuta loginWithRedirect al hacer clic en 'Iniciar sesión'", () => {
    renderNavbar();
    const loginButton = screen.getByText(/iniciar sesión/i);
    fireEvent.click(loginButton);
    expect(mockLoginWithRedirect).toHaveBeenCalledWith({ connection: "google-oauth2" });
  });

  it("muestra botones de usuario autenticado cuando isAuthenticated es true", () => {
    renderNavbar({
      isAuthenticated: true,
      user: { name: "Hernán" }
    });
    
    expect(screen.getByText(/Hola, Hernán/i)).toBeTruthy();
    expect(screen.getByText(/perfil/i)).toBeTruthy();
    expect(screen.getByText(/cerrar sesión/i)).toBeTruthy();
  });

  it("ejecuta logout al hacer clic en 'Cerrar sesión'", () => {
    renderNavbar({
      isAuthenticated: true,
      user: { name: "Hernán" }
    });
    
    const logoutButton = screen.getByText(/cerrar sesión/i);
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalledWith({ 
      returnTo: window.location.origin 
    });
  });

  it("ejecuta onProfileClick al hacer clic en 'PERFIL'", () => {
    renderNavbar({
      isAuthenticated: true,
      user: { name: "Hernán" }
    });
    
    const profileButton = screen.getByText(/perfil/i);
    fireEvent.click(profileButton);
    
    expect(mockProfileClick).toHaveBeenCalled();
  });

  it("ejecuta toggleCart al hacer clic en el botón del carrito", () => {
    renderNavbar();
    
    const cartButton = screen.getByTestId("cart-button");
    fireEvent.click(cartButton);
    
    expect(mockToggleCart).toHaveBeenCalled();
  });

  it("muestra el contador del carrito correctamente", () => {
    renderNavbar({}, {
      carrito: [
        { id: 1, nombre: "Café" },
        { id: 2, nombre: "Té" }
      ]
    });
    
    const cartCount = screen.getByText("2");
    expect(cartCount).toBeTruthy();
  });

  it("navega a la categoría correcta al hacer clic en un enlace", () => {
    renderNavbar();
    
    const cafeLink = screen.getByText(/café/i);
    fireEvent.click(cafeLink);
    
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=cafe");
  });

  // ✅ NUEVOS TESTS PARA CUBRIR BRANCHES

  it("muestra 'Usuario' cuando user.name no está disponible", () => {
    renderNavbar({
      isAuthenticated: true,
      user: {} // Sin nombre
    });
    
    expect(screen.getByText(/Hola, Usuario/i)).toBeTruthy();
  });

  it("muestra 0 en el contador cuando el carrito es null", () => {
    renderNavbar({}, { carrito: null });
    
    const cartCount = screen.getByText("0");
    expect(cartCount).toBeTruthy();
  });

  it("muestra 0 en el contador cuando el carrito es undefined", () => {
    renderNavbar({}, { carrito: undefined });
    
    const cartCount = screen.getByText("0");
    expect(cartCount).toBeTruthy();
  });

  it("navega al inicio al hacer clic en el logo", () => {
    renderNavbar();
    
    const logo = screen.getByText(/kairos coffee/i);
    fireEvent.click(logo);
    
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navega a contacto al hacer clic en CONTÁCTANOS", () => {
    renderNavbar();
    
    const contactLink = screen.getByText(/contáctanos/i);
    fireEvent.click(contactLink);
    
    expect(mockNavigate).toHaveBeenCalledWith("/contacto");
  });

  it("navega a registro al hacer clic en REGISTRARSE", () => {
    renderNavbar();
    
    const registerButton = screen.getByText(/registrarse/i);
    fireEvent.click(registerButton);
    
    expect(mockNavigate).toHaveBeenCalledWith("/registro");
  });

  it("abre y cierra el menú hamburguesa", () => {
    renderNavbar();
    
    const menuToggle = screen.getByLabelText(/abrir menú/i);
    fireEvent.click(menuToggle);
    
    const nav = screen.getByRole("navigation");
    expect(nav.classList.contains("active")).toBe(true);
    
    fireEvent.click(menuToggle);
    expect(nav.classList.contains("active")).toBe(false);
  });

  it("cierra el menú al navegar a una categoría", () => {
    renderNavbar();
    
    // Abrir menú
    const menuToggle = screen.getByLabelText(/abrir menú/i);
    fireEvent.click(menuToggle);
    
    // Navegar a categoría
    const yerbaLink = screen.getByText(/yerba mate/i);
    fireEvent.click(yerbaLink);
    
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=yerba");
  });

  it("navega a todas las categorías correctamente", () => {
    renderNavbar();
    
    // Cápsulas
    fireEvent.click(screen.getByText(/cápsulas/i));
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=capsulas");
    
    mockNavigate.calls.reset();
    
    // Accesorios
    fireEvent.click(screen.getByText(/accesorios/i));
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=accesorios");
  });
});