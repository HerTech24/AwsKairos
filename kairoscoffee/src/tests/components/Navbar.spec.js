// ==========================================
// src/tests/components/Navbar.spec.js
// 100% JASMINE - SIN JEST
// ==========================================
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CarritoContext } from "../../context/CarritoContext";

describe("🧩 Navbar Component", () => {
  let mockCarrito;
  let mockNavigate;
  let mockAuth0;

  beforeEach(() => {
    localStorage.clear();
    
    mockNavigate = jasmine.createSpy("navigate");
    mockCarrito = {
      carrito: [],
      toggleCart: jasmine.createSpy("toggleCart")
    };
    
    mockAuth0 = {
      isAuthenticated: false,
      user: null,
      logout: jasmine.createSpy("logout"),
      loginWithRedirect: jasmine.createSpy("loginWithRedirect")
    };
  });

  const renderNavbar = (authOverride = {}, carritoOverride = {}) => {
    const auth = { ...mockAuth0, ...authOverride };
    const carrito = { ...mockCarrito, ...carritoOverride };
    
    return render(
      <CarritoContext.Provider value={carrito}>
        <BrowserRouter>
          <Navbar 
            navigateHook={mockNavigate}
            auth0Hook={auth}
            carritoHook={carrito}
          />
        </BrowserRouter>
      </CarritoContext.Provider>
    );
  };

  it("Renderiza logo", () => {
    renderNavbar();
    expect(screen.getByText("Kairos Coffee")).toBeTruthy();
  });

  it("Renderiza links de navegación", () => {
    renderNavbar();
    expect(screen.getByText("Inicio")).toBeTruthy();
    expect(screen.getByText("Café")).toBeTruthy();
  });

  it("Usuario NO autenticado muestra Registrarse", () => {
    renderNavbar({ isAuthenticated: false });
    expect(screen.getByText("Registrarse")).toBeTruthy();
  });

  it("Usuario NO autenticado muestra Iniciar Sesión", () => {
    renderNavbar({ isAuthenticated: false });
    expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
  });

  it("Click en Registrarse navega", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("Registrarse"));
    expect(mockNavigate).toHaveBeenCalledWith("/registro");
  });

  it("Click en Iniciar Sesión navega", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("Iniciar Sesión"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("Usuario autenticado muestra nombre", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: { name: "Juan Pérez" } 
    });
    expect(screen.getByText(/Hola, Juan!/)).toBeTruthy();
  });

  it("Usuario autenticado muestra Mi Perfil", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: { name: "Test" } 
    });
    expect(screen.getByText("Mi Perfil")).toBeTruthy();
  });

  it("Usuario autenticado muestra Cerrar Sesión", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: { name: "Test" } 
    });
    expect(screen.getByText("Cerrar Sesión")).toBeTruthy();
  });

  it("Nombre vacío muestra Usuario", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: { name: "" } 
    });
    expect(screen.getByText(/Hola, Usuario!/)).toBeTruthy();
  });

  it("Sin nombre muestra Usuario", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: {} 
    });
    expect(screen.getByText(/Hola, Usuario!/)).toBeTruthy();
  });

  it("Extrae primer nombre correctamente", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: { name: "María José González" } 
    });
    expect(screen.getByText(/Hola, María!/)).toBeTruthy();
  });

  it("Click en logo navega a home", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("Kairos Coffee"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("Click en Inicio navega", () => {
    renderNavbar();
    const inicios = screen.getAllByText("Inicio");
    fireEvent.click(inicios[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("Click en Café navega con categoría", () => {
    renderNavbar();
    const cafes = screen.getAllByText("Café");
    fireEvent.click(cafes[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=cafe");
  });

  it("Click en Cápsulas navega", () => {
    renderNavbar();
    fireEvent.click(screen.getAllByText("Cápsulas")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=capsulas");
  });

  it("Click en Accesorios navega", () => {
    renderNavbar();
    fireEvent.click(screen.getAllByText("Accesorios")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=accesorios");
  });

  it("Click en Yerba Mate navega", () => {
    renderNavbar();
    fireEvent.click(screen.getAllByText("Yerba Mate")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=yerba");
  });

  it("Click en Contáctanos navega", () => {
    renderNavbar();
    fireEvent.click(screen.getAllByText("Contáctanos")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/contacto");
  });

  it("Carrito vacío muestra 0", () => {
    renderNavbar({}, { carrito: [] });
    expect(screen.getByText("0")).toBeTruthy();
  });

  it("Carrito con items muestra cantidad", () => {
    renderNavbar({}, { carrito: [{}, {}, {}] });
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("Carrito null muestra 0", () => {
    renderNavbar({}, { carrito: null });
    expect(screen.getByText("0")).toBeTruthy();
  });

  it("Click en carrito llama toggleCart", () => {
    renderNavbar();
    const cartBtn = screen.getByText("0").closest("button");
    fireEvent.click(cartBtn);
    expect(mockCarrito.toggleCart).toHaveBeenCalled();
  });

  it("Menu inicia cerrado", () => {
    const { container } = renderNavbar();
    const nav = container.querySelector("nav");
    expect(nav.classList.contains("open")).toBe(false);
  });

  it("Click en hamburguesa abre menu", () => {
    const { container } = renderNavbar();
    const hamburguesa = container.querySelector(".nav-toggle");
    fireEvent.click(hamburguesa);
    expect(container.querySelector("nav").classList.contains("open")).toBe(true);
  });

  it("Click en hamburguesa cierra menu", () => {
    const { container } = renderNavbar();
    const hamburguesa = container.querySelector(".nav-toggle");
    fireEvent.click(hamburguesa);
    fireEvent.click(hamburguesa);
    expect(container.querySelector("nav").classList.contains("open")).toBe(false);
  });

  it("Usuario local con accessToken muestra perfil", () => {
    localStorage.setItem("accessToken", "token123");
    localStorage.setItem("userData", JSON.stringify({ nombre: "Pedro" }));
    renderNavbar();
    expect(screen.getByText(/Hola, Pedro!/)).toBeTruthy();
  });

  it("Auth local sin nombre usa Usuario", () => {
    localStorage.setItem("accessToken", "token");
    localStorage.setItem("userData", JSON.stringify({}));
    renderNavbar();
    expect(screen.getByText(/Hola, Usuario!/)).toBeTruthy();
  });

  it("Click en categoría mobile cierra menu", () => {
    const { container } = renderNavbar();
    const hamburguesa = container.querySelector(".nav-toggle");
    
    fireEvent.click(hamburguesa);
    expect(container.querySelector("nav").classList.contains("open")).toBe(true);
    
    const cafesMobile = screen.getAllByText("Café");
    fireEvent.click(cafesMobile[1]);
    
    expect(container.querySelector("nav").classList.contains("open")).toBe(false);
  });

  it("Cerrar sesión llama logout de Auth0", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: { name: "Test" } 
    });
    
    fireEvent.click(screen.getByText("Cerrar Sesión"));
    expect(mockAuth0.logout).toHaveBeenCalled();
  });

  it("Carrito con 5 items muestra badge correcto", () => {
    renderNavbar({}, { carrito: [{},{},{},{},{}] });
    expect(screen.getByText("5")).toBeTruthy();
  });

  it("Multiple categorías navegan correctamente", () => {
    renderNavbar();
    
    fireEvent.click(screen.getAllByText("Yerba Mate")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=yerba");
    
    mockNavigate.calls.reset();
    
    fireEvent.click(screen.getAllByText("Accesorios")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/productos?categoria=accesorios");
  });

  it("Nombre con múltiples espacios", () => {
    renderNavbar({ 
      isAuthenticated: true, 
      user: { name: "  Juan   Carlos  " } 
    });
    expect(screen.getByText(/Hola, Juan!/)).toBeTruthy();
  });
});

