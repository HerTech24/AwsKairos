// src/tests/test-setup.js
import 'jasmine';
import { configure, cleanup } from '@testing-library/react';
import 'jasmine-dom'; // <-- Importa los matchers de jasmine-dom (ej. toBeInTheDocument)

// Configurar testing-library
configure({ testIdAttribute: 'data-testid' });

// Mock de console para evitar warnings en tests
global.console = {
  ...console,
  // ✅ CORRECCIÓN: Usar jasmine.createSpy() en lugar de jest.fn()
  error: jasmine.createSpy('console.error'),
  warn: jasmine.createSpy('console.warn'),
  log: jasmine.createSpy('console.log'),
};

// Configuración global de Jasmine
beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  
  // Limpiar mocks antes de cada test
  global.console.error.calls.reset();
  global.console.warn.calls.reset();
  global.console.log.calls.reset();
});

// Limpiar el DOM después de cada test (buena práctica con testing-library)
afterEach(() => {
  cleanup();
});