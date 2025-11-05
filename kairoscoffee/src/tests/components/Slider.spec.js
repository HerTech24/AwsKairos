// src/tests/components/Slider.spec.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../../components/Slider";

describe("Slider Component", () => {
    const mockAgregarAlCarrito = jasmine.createSpy("agregarAlCarrito");
    const items = [
        { id: 1, nombre: "Café Premium" },
        { id: 2, nombre: "Yerba Mate" },
    ];

    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it("renderiza los productos correctamente", () => {
        render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
        expect(screen.getByText(/Café Premium/i)).toBeTruthy();
        expect(screen.getByText(/Yerba Mate/i)).toBeTruthy();
    });

    it("permite desplazarse a la izquierda y derecha sin errores", () => {
        const { container } = render(<Slider items={items} agregarAlCarrito={mockAgregarAlCarrito} />);
        const prevBtn = container.querySelector(".prev");
        const nextBtn = container.querySelector(".next");
        fireEvent.click(prevBtn);
        fireEvent.click(nextBtn);
        expect(prevBtn).toBeTruthy();
        expect(nextBtn).toBeTruthy();
    });
});
