import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../../components/Slider";
import { CarritoContext } from "../../context/CarritoContext";

describe("🖼️ Slider Component (Jasmine)", () => {
  let mockAgregarProducto;
  const mockItems = [
    { id: 1, nombre: "Café Test", precio: 5000, imagen: "img.jpg" }
  ];

  beforeEach(() => {
    mockAgregarProducto = jasmine.createSpy("agregarProducto");
  });

  it("renderiza items y permite agregar (Props)", () => {
    // IMPORTANTE: Pasamos agregarAlCarrito como PROP porque tu componente lo usa así
    render(
      <CarritoContext.Provider value={{ agregarProducto: mockAgregarProducto }}>
        <Slider items={mockItems} agregarAlCarrito={mockAgregarProducto} />
      </CarritoContext.Provider>
    );

    expect(screen.getByText("Café Test")).toBeTruthy();
    
    // Buscamos el botón y hacemos click
    const btns = screen.getAllByRole("button", { name: /agregar/i });
    fireEvent.click(btns[0]);

    expect(mockAgregarProducto).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 1,
      nombre: "Café Test"
    }));
  });

  it("maneja lista vacía (Branch coverage)", () => {
    // IMPORTANTE: Pasamos un array VACÍO [], no undefined, para que .map no explote
    render(
      <CarritoContext.Provider value={{ agregarProducto: mockAgregarProducto }}>
        <Slider items={[]} agregarAlCarrito={mockAgregarProducto} />
      </CarritoContext.Provider>
    );
    
    // Verifica que NO haya items renderizados o busque el mensaje de vacío si existe
    const item = screen.queryByText("Café Test");
    expect(item).toBeNull();
  });
});