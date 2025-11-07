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
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    mockAgregarAlCarrito.calls.reset();
  });

  // ============================================================================
  // RENDERIZADO BÁSICO
  // ============================================================================
  it("renderiza correctamente todos los productos del slider", () => {
    render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText(/Café Premium/i)).toBeTruthy();
    expect(screen.getByText(/Yerba Mate/i)).toBeTruthy();
    expect(screen.getByText(/Té Verde/i)).toBeTruthy();
  });

  // ============================================================================
  // BOTONES DE DESPLAZAMIENTO
  // ============================================================================
  it("permite desplazarse a la izquierda y derecha sin errores", () => {
    const { container } = render(
      <Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />
    );

    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");

    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);
  });

  // ============================================================================
  // BOTÓN "AGREGAR AL CARRITO"
  // ============================================================================
  it("ejecuta agregarAlCarrito al hacer clic en el botón correspondiente", () => {
    render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
    const addButtons = screen.getAllByRole("button", { name: /agregar/i });

    expect(addButtons.length).toBeGreaterThan(0);
    fireEvent.click(addButtons[0]);

    expect(mockAgregarAlCarrito).toHaveBeenCalled();
  });
});
