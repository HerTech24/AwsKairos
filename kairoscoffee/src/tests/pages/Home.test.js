// src/tests/Home.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Home from '../pages/Home'; // Ajusta la ruta

// Importar los MÓDULOS que vamos a mockear
import * as RouterDom from 'react-router-dom';
import * as LoginModalModule from '../components/LoginModal';
import * as CarouselModule from '../components/Carousel';
import * as ShippingBarModule from '../components/ShippingBar';
import * as CategoriesGridModule from '../components/CategoriesGrid';
import * as BannerGifModule from '../components/BannerGif';

const mockNavigate = jasmine.createSpy('navigate');

// Spies para capturar las props
let onVerProductosSpy;
let agregarAlCarritoSpy;

describe('Home Page', () => {
  beforeEach(() => {
    mockNavigate.calls.reset();

    // Mockear el hook useNavigate
    spyOn(RouterDom, 'useNavigate').and.returnValue(mockNavigate);

    // Mockear los componentes hijos
    spyOn(LoginModalModule, 'default').and.returnValue(<div data-testid="mock-login-modal" />);
    spyOn(ShippingBarModule, 'default').and.returnValue(<div data-testid="mock-shipping-bar" />);
    spyOn(BannerGifModule, 'default').and.returnValue(<div data-testid="mock-banner-gif" />);

    // Mockear capturando props
    spyOn(CarouselModule, 'default').and.callFake((props) => {
      onVerProductosSpy = props.onVerProductos;
      return <div data-testid="mock-carousel" />;
    });

    spyOn(CategoriesGridModule, 'default').and.callFake((props) => {
      agregarAlCarritoSpy = props.agregarAlCarrito;
      return <div data-testid="mock-categories-grid" />;
    });
  });

  it('debe renderizar la página Home y sus componentes hijos mockeados', () => {
    render(<Home />);
    expect(screen.getByTestId('mock-login-modal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('mock-shipping-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-categories-grid')).toBeInTheDocument();
    expect(screen.getByTestId('mock-banner-gif')).toBeInTheDocument();
    expect(screen.getByText('🛒 Carrito: 0 productos')).toBeInTheDocument();
  });

  it('debe llamar a navigate cuando se invoca onVerProductos (del Carousel)', () => {
    render(<Home />);
    expect(onVerProductosSpy).toEqual(jasmine.any(Function));

    act(() => { onVerProductosSpy(); });

    expect(mockNavigate).toHaveBeenCalledWith('/productos');
  });

  it('debe actualizar el contador de carrito local cuando se invoca agregarAlCarrito', () => {
    render(<Home />);
    expect(agregarAlCarritoSpy).toEqual(jasmine.any(Function));

    // Estado inicial
    expect(screen.getByText('🛒 Carrito: 0 productos')).toBeInTheDocument();

    // Actuar
    act(() => { agregarAlCarritoSpy({ id: 1, name: 'Producto Test' }); });

    // Verificar
    expect(screen.getByText('🛒 Carrito: 1 productos')).toBeInTheDocument();
  });
});