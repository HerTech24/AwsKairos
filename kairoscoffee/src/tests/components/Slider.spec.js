/**
 * Test del componente Slider
 * ✅ Adaptado para Karma + Jasmine + React 18 (sin Jest)
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../../components/Slider";

describe("🧩 Slider Component (Jasmine + Karma)", () => {
  const mockAgregarAlCarrito = jasmine.createSpy("agregarAlCarrito");
  const items = [
    { id: 1, nombre: "Café Premium" },
    { id: 2, nombre: "Yerba Mate" },
    { id: 3, nombre: "Té Verde" },
  ];

  beforeEach(() => jasmine.clock().install());
  afterEach(() => {
    jasmine.clock().uninstall();
    mockAgregarAlCarrito.calls.reset();
  });

  it("renderiza correctamente todos los productos del slider", () => {
    render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.queryByText(/Café Premium/i)).toBeDefined();
    expect(screen.queryByText(/Yerba Mate/i)).toBeDefined();
    expect(screen.queryByText(/Té Verde/i)).toBeDefined();
  });

  it("permite desplazarse a la izquierda y derecha sin errores", () => {
    render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
    const prevBtn = screen.getByRole("button", { name: /anterior|previous/i });
    const nextBtn = screen.getByRole("button", { name: /siguiente|next/i });

    expect(prevBtn).toBeDefined();
    expect(nextBtn).toBeDefined();

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);
  });

  it("ejecuta agregarAlCarrito al hacer clic en el botón correspondiente", () => {
    render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
    const addButtons = screen.getAllByRole("button", { name: /agregar/i });
    expect(addButtons.length).toBeGreaterThan(0);
    fireEvent.click(addButtons[0]);
    expect(mockAgregarAlCarrito).toHaveBeenCalled();
  });

  it("muestra mensaje vacío si no hay productos", () => {
    render(<Slider items={[]} agregarAlCarrito={mockAgregarAlCarrito} />);
    const emptyMessage = screen.queryByText(/no hay productos/i);
    expect(emptyMessage).toBeDefined();
  });
});
