// src/tests/Navbar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar'; // Ajusta la ruta a tu componente

// Mocks de los hooks
import * as Auth0 from '@auth0/auth0-react';
import * as RouterDom from 'react-router-dom';
import * as CarritoContext from '../context/CarritoContext'; // Ajusta la ruta

// Spies
const mockNavigate = jasmine.createSpy('navigate');
const mockToggleCart = jasmine.createSpy('toggleCart');
const mockLogin = jasmine.createSpy('loginWithRedirect');
const mockLogout = jasmine.createSpy('logout');

describe('Navbar Component', () => {

  beforeEach(() => {
    // Limpiar spies
    mockNavigate.calls.reset();
    mockToggleCart.calls.reset();
    mockLogin.calls.reset();
    mockLogout.calls.reset();

    // Mock por defecto (no autenticado, carrito vacío)
    spyOn(Auth0, 'useAuth0').and.returnValue({
      isAuthenticated: false,
      user: null,
      loginWithRedirect: mockLogin,
      logout: mockLogout,
    });
    
    spyOn(CarritoContext, 'useCarrito').and.returnValue({
      carrito: [],
      toggleCart: mockToggleCart,
    });
    
    spyOn(RouterDom, 'useNavigate').and.returnValue(mockNavigate);
  });

  it('debe renderizar la marca "Kairos Coffee"', () => {
    render(<Navbar />);
    expect(screen.getByText('Kairos Coffee')).toBeInTheDocument();
  });

  it('debe mostrar botones de Login y Registro si no está autenticado', () => {
    render(<Navbar />);
    expect(screen.getByText('INICIAR SESIÓN')).toBeInTheDocument();
    expect(screen.getByText('REGISTRARSE')).toBeInTheDocument();
  });

  it('debe llamar a loginWithRedirect al hacer clic en "INICIAR SESIÓN"', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText('INICIAR SESIÓN'));
    expect(mockLogin).toHaveBeenCalledWith({ connection: 'google-oauth2' });
  });

  it('debe mostrar Perfil y Cerrar Sesión si está autenticado', () => {
    // Sobrescribir mock para este test
    Auth0.useAuth0.and.returnValue({
      isAuthenticated: true,
      user: { name: 'Test User' },
      loginWithRedirect: mockLogin,
      logout: mockLogout,
    });

    render(<Navbar />);
    expect(screen.getByText('👋 Hola, Test User')).toBeInTheDocument();
    expect(screen.getByText('PERFIL')).toBeInTheDocument();
    expect(screen.getByText('CERRAR SESIÓN')).toBeInTheDocument();
  });

  it('debe navegar a la categoría CAFÉ', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText('CAFÉ'));
    expect(mockNavigate).toHaveBeenCalledWith('/productos?categoria=cafe');
  });

  it('debe mostrar el contador del carrito (ej. 3)', () => {
    CarritoContext.useCarrito.and.returnValue({
      carrito: [{}, {}, {}], // 3 items
      toggleCart: mockToggleCart,
    });

    render(<Navbar />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('debe llamar a toggleCart al hacer clic en el botón del carrito', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Abrir carrito'));
    expect(mockToggleCart).toHaveBeenCalled();
  });
});