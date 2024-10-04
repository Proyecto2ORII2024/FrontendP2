import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingContainer from './FloatingContainer';

describe('Componente FloatingContainer', () => {
  const mockSetOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente cuando open es true', () => {
    render(
      <FloatingContainer open={true} setOpen={mockSetOpen}>
        <div>Contenido del contenedor</div>
      </FloatingContainer>
    );

    // Verifica que el contenedor sea visible y contenga el contenido
    expect(screen.getByText('Contenido del contenedor')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  test('no renderiza cuando open es false', () => {
    render(
      <FloatingContainer open={false} setOpen={mockSetOpen}>
        <div>Contenido del contenedor</div>
      </FloatingContainer>
    );

    // Verifica que el contenedor no sea visible
    expect(screen.queryByText('Contenido del contenedor')).not.toBeInTheDocument();
  });

  test('cierra el contenedor al hacer clic en el botón de cerrar (bttType 0)', () => {
    render(
      <FloatingContainer open={true} setOpen={mockSetOpen} bttType={0}>
        <div>Contenido del contenedor</div>
      </FloatingContainer>
    );

    // Haz clic en el botón de cerrar
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test('cierra el contenedor al hacer clic en el botón "Entendido" (bttType 1)', () => {
    render(
      <FloatingContainer open={true} setOpen={mockSetOpen} bttType={1}>
        <div>Contenido del contenedor</div>
      </FloatingContainer>
    );

    // Haz clic en el botón "Entendido"
    const understoodButton = screen.getByRole('button', { name: /entendido/i });
    fireEvent.click(understoodButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test('muestra correctamente el botón de cerrar cuando bttType es 0', () => {
    render(
      <FloatingContainer open={true} setOpen={mockSetOpen} bttType={0}>
        <div>Contenido del contenedor</div>
      </FloatingContainer>
    );

    // Verifica que el botón de cerrar esté presente
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('muestra correctamente el botón "Entendido" cuando bttType es 1', () => {
    render(
      <FloatingContainer open={true} setOpen={mockSetOpen} bttType={1}>
        <div>Contenido del contenedor</div>
      </FloatingContainer>
    );

    // Verifica que el botón "Entendido" esté presente
    expect(screen.getByRole('button', { name: /entendido/i })).toBeInTheDocument();
  });
});
