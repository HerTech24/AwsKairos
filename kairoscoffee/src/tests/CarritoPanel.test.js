// src/tests/CarritoPanel.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarritoPanel from '../components/CarritoPanel'; // Ajusta la ruta

// Mocks
import * as RouterDom from 'react-router-dom';
import * as CarritoContext from '../context/CarritoContext'; // Ajusta la ruta

const mockNavigate = jasmine.createSpy('navigate');
const mockToggleCart = jasmine.createSpy('toggleCart');
const mockEliminarProducto = jasmine.createSpy('eliminarProducto');
const mockUpdateQuantity = jasmine.createSpy('updateQuantity');

// Mock de items del carrito
const mockItems = [
  { id: 1, nombre: 'Café Grano', precio: 1000, quantity: 2, imagen: 'cafe.jpg' },
  { id: 2, nombre: 'Té Verde', precio: 500, quantity: 1, imagen: 'te.jpg' },
];

describe('CarritoPanel Component', () => {

  beforeEach(() => {
    mockNavigate.calls.reset();
    mockToggleCart.calls.reset();
    mockEliminarProducto.calls.reset();
    mockUpdateQuantity.calls.reset();
    
    spyOn(RouterDom, 'useNavigate').and.returnValue(mockNavigate);
    
    // Mock por defecto: carrito vacío y abierto
    spyOn(CarritoContext, 'useCarrito').and.returnValue({
      carrito: [],
      isCartOpen: true,
      toggleCart: mockToggleCart,
      eliminarProducto: mockEliminarProducto,
      updateQuantity: mockUpdateQuantity,
    });
  });

  it('debe mostrar "El carrito está vacío" si no hay items', () => {
    render(<CarritoPanel />);
    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
  });

  it('debe renderizar los items del carrito y calcular el total', () => {
    // Total = (1000 * 2) + (500 * 1) = 2500
    CarritoContext.useCarrito.and.returnValue({
      carrito: mockItems,
      isCartOpen: true,
      toggleCart: mockToggleCart,
      eliminarProducto: mockEliminarProducto,
      updateQuantity: mockUpdateQuantity,
    });

    render(<CarritoPanel />);
    expect(screen.getByText('Café Grano')).toBeInTheDocument();
    expect(screen.getByText('Té Verde')).toBeInTheDocument();
    // Usamos 'es-CL' para el formato
    expect(screen.getByText(/Total: \$2\.500/i)).toBeInTheDocument();
  });

  it('debe llamar a eliminarProducto', () => {
    CarritoContext.useCarrito.and.returnValue({ carrito: mockItems, isCartOpen: true, toggleCart: mockToggleCart, eliminarProducto: mockEliminarProducto, updateQuantity: mockUpdateQuantity });
    render(<CarritoPanel />);
    
    const deleteButtons = screen.getAllByText('🗑️');
    fireEvent.click(deleteButtons[0]); // Clic en el primero
    
    expect(mockEliminarProducto).toHaveBeenCalledWith(0); // Índice 0
  });

  it('debe llamar a updateQuantity al hacer clic en +', () => {
    CarritoContext.useCarrito.and.returnValue({ carrito: mockItems, isCartOpen: true, toggleCart: mockToggleCart, eliminarProducto: mockEliminarProducto, updateQuantity: mockUpdateQuantity });
    render(<CarritoPanel />);

    const increaseButtons = screen.getAllByText('+');
    fireEvent.click(increaseButtons[0]); // Clic en el '+' del primer item
    
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3); // (item.id, newQuantity)
  });

  it('debe llamar a toggleCart y navigate al hacer clic en "Ir al Checkout"', () => {
    CarritoContext.useCarrito.and.returnValue({ carrito: mockItems, isCartOpen: true, toggleCart: mockToggleCart, eliminarProducto: mockEliminarProducto, updateQuantity: mockUpdateQuantity });
    render(<CarritoPanel />);
    
    fireEvent.click(screen.getByText('Ir al Checkout'));
    
    expect(mockToggleCart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });
});