// src/tests/useCart.test.js
import React from 'react';
import { renderHook } from '@testing-library/react';
import { useCart } from '../hooks/useCart'; // Ajusta la ruta
import { CartContext } from '../context/CartContext'; // Ajusta la ruta

describe('useCart Hook', () => {

  it('debe lanzar un error si se usa fuera de un CartProvider', () => {
    // Suprimimos el error esperado en la consola
    spyOn(console, 'error');
    
    const { result } = renderHook(() => useCart());
    
    expect(result.error).toEqual(new Error('useCart debe ser usado dentro de un CartProvider'));
  });

  it('debe devolver el valor del contexto cuando está dentro de un CartProvider', () => {
    const mockContextValue = {
      cart: [{ id: 1, name: 'Café' }],
      addItem: jasmine.createSpy('addItem'),
    };

    const wrapper = ({ children }) => (
      <CartContext.Provider value={mockContextValue}>
        {children}
      </CartContext.Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.error).toBeUndefined();
    expect(result.current.cart).toEqual(mockContextValue.cart);
    expect(result.current.addItem).toBe(mockContextValue.addItem);
  });
});