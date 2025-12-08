// ==========================================
// src/tests/components/Slider.spec.js
// 100% JASMINE - SIN JEST
// ==========================================
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../../components/Slider";

describe("🖼️ Slider Component", () => {
  let mockAgregarAlCarrito;
  
  const mockItems = [
    { id: 1, nombre: "Café Espresso", precio: 5000, imagen: "esp.jpg" },
    { id: 2, nombre: "Café Latte", precio: 6000, imagen: "lat.jpg" },
    { id: 3, nombre: "Cappuccino", precio: 5500, imagen: "cap.jpg" }
  ];

  beforeEach(() => {
    mockAgregarAlCarrito = jasmine.createSpy("agregarAlCarrito");
  });

  it("Renderiza todos los productos", () => {
    render(<Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText("Café Espresso")).toBeTruthy();
    expect(screen.getByText("Café Latte")).toBeTruthy();
    expect(screen.getByText("Cappuccino")).toBeTruthy();
  });

  it("Renderiza botones de navegación", () => {
    render(<Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByLabelText("Anterior")).toBeTruthy();
    expect(screen.getByLabelText("Siguiente")).toBeTruthy();
  });

  it("Click en anterior llama scrollBy", () => {
    const { container } = render(
      <Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    const sliderElement = container.querySelector(".slider");
    const scrollBySpy = jasmine.createSpy("scrollBy");
    sliderElement.scrollBy = scrollBySpy;
    
    fireEvent.click(screen.getByLabelText("Anterior"));
    expect(scrollBySpy).toHaveBeenCalledWith({ left: -300, behavior: "smooth" });
  });

  it("Click en siguiente llama scrollBy", () => {
    const { container } = render(
      <Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    const sliderElement = container.querySelector(".slider");
    const scrollBySpy = jasmine.createSpy("scrollBy");
    sliderElement.scrollBy = scrollBySpy;
    
    fireEvent.click(screen.getByLabelText("Siguiente"));
    expect(scrollBySpy).toHaveBeenCalledWith({ left: 300, behavior: "smooth" });
  });

  it("Lista vacía no renderiza productos", () => {
    render(<Slider items={[]} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.queryByText("Café Espresso")).toBeNull();
  });

  it("Pasa agregarAlCarrito a ProductoCard", () => {
    render(<Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />);
    const btns = screen.getAllByText(/Agregar al carrito/i);
    expect(btns.length).toBe(3);
  });

  it("Slider con un solo item", () => {
    const oneItem = [mockItems[0]];
    render(<Slider items={oneItem} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText("Café Espresso")).toBeTruthy();
  });

  it("Botones tienen texto correcto", () => {
    render(<Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />);
    expect(screen.getByText("<")).toBeTruthy();
    expect(screen.getByText(">")).toBeTruthy();
  });

  it("Multiple clicks en anterior", () => {
    const { container } = render(
      <Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    const sliderElement = container.querySelector(".slider");
    const scrollBySpy = jasmine.createSpy("scrollBy");
    sliderElement.scrollBy = scrollBySpy;
    
    const btnPrev = screen.getByLabelText("Anterior");
    fireEvent.click(btnPrev);
    fireEvent.click(btnPrev);
    
    expect(scrollBySpy).toHaveBeenCalledTimes(2);
  });

  it("Multiple clicks en siguiente", () => {
    const { container } = render(
      <Slider items={mockItems} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    const sliderElement = container.querySelector(".slider");
    const scrollBySpy = jasmine.createSpy("scrollBy");
    sliderElement.scrollBy = scrollBySpy;
    
    const btnNext = screen.getByLabelText("Siguiente");
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    
    expect(scrollBySpy).toHaveBeenCalledTimes(2);
  });
});