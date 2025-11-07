/**
 * Test del componente Slider
 * Adaptado para Karma + Jasmine + React 18 + Testing Library
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../../components/Slider";

describe("🧩 Slider Component (Karma + Jasmine)", () => {
  const mockAgregarAlCarrito = jasmine.createSpy("agregarAlCarrito");
  const items = [
    { id: 1, nombre: "Café Premium" },
    { id: 2, nombre: "Yerba Mate" },
    { id: 3, nombre: "Té Verde" },
  ];

  beforeEach(() => {
    // Correcto: Mockear timers para cualquier setTimeout/setInterval en el slider
    jasmine.clock().install();
  });

  afterEach(() => {
    // Correcto: Limpiar timers y spies
    jasmine.clock().uninstall();
    mockAgregarAlCarrito.calls.reset();
  });

  // ============================================================================
  // RENDERIZADO BÁSICO
  // ============================================================================
  it("renderiza correctamente todos los productos del slider", () => {
    render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
    
    // ✅ REFINADO: Usar matchers de jasmine-dom
    expect(screen.getByText(/Café Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/Yerba Mate/i)).toBeInTheDocument();
    expect(screen.getByText(/Té Verde/i)).toBeInTheDocument();
  });

  // ============================================================================
  // BOTONES DE DESPLAZAMIENTO
  // ============================================================================
  it("permite desplazarse a la izquierda y derecha sin errores", () => {
    render(
      <Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />
    );

    // ✅ REFINADO: Usar queries accesibles (requiere aria-label en el componente)
    const prevBtn = screen.getByRole("button", { name: /previous|anterior/i });
    const nextBtn = screen.getByRole("button", { name: /next|siguiente/i });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);
    
    // El test pasa si los clics no lanzan un error
  });

  // ============================================================================
  // BOTÓN "AGREGAR AL CARRITO"
  // ============================================================================
  it("ejecuta agregarAlCarrito al hacer clic en el botón correspondiente", () => {
    render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
    
    // ✅ EXCELENTE: Esta query es la correcta
    const addButtons = screen.getAllByRole("button", { name: /agregar/i });

    expect(addButtons.length).toBeGreaterThan(0);
    fireEvent.click(addButtons[0]);

    // ✅ EXCELENTE: Matcher correcto de Jasmine
    expect(mockAgregarAlCarrito).toHaveBeenCalled();
  });
});