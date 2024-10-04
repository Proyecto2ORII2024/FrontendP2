import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoBubble from './InfoBubble';
import FloatingContainer from '../floatingContainer/FloatingContainer';

// Mock del componente FloatingContainer para evitar renderizarlo en las pruebas
jest.mock('../floatingContainer/FloatingContainer', () => {
  return function MockFloatingContainer({ open, setOpen, children }) {
    return open ? <div>{children}</div> : null;
  };
});

describe('Componente InfoBubble', () => {
  const info = {
    title: 'Título de Prueba',
    shortInfo: 'Información corta de prueba.',
    longInfo: {
      text: ['Detalles 1', 'Detalles 2'],
      list: {
        item1: 'Descripción 1',
        item2: 'Descripción 2'
      }
    }
  };

  beforeEach(() => {
    render(<InfoBubble info={info} />);
  });

  test('renderiza el icono de información', () => {
    const icon = screen.getByRole('img'); // El SVG se considera un icono
    expect(icon).toBeInTheDocument();
  });

  test('muestra información corta al pasar el ratón', () => {
    const icon = screen.getByRole('img');
    fireEvent.mouseEnter(icon);

    expect(screen.getByText('Título de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Información corta de prueba.')).toBeInTheDocument();
    expect(screen.getByText(/Da clic en el botón/i)).toBeInTheDocument();
  });

  test('muestra el contenedor flotante al hacer clic en "Ver más"', () => {
    const icon = screen.getByRole('img');
    fireEvent.mouseEnter(icon);
    const button = screen.getByRole('button', { name: /ver más/i });
    fireEvent.click(button);

    expect(screen.getByText('Título de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Detalles 1')).toBeInTheDocument();
    expect(screen.getByText('Detalles 2')).toBeInTheDocument();
    expect(screen.getByText('item1: Descripción 1')).toBeInTheDocument();
    expect(screen.getByText('item2: Descripción 2')).toBeInTheDocument();
  });

  test('cierra el contenedor flotante al hacer clic fuera del icono', () => {
    const icon = screen.getByRole('img');
    fireEvent.mouseEnter(icon);
    const button = screen.getByRole('button', { name: /ver más/i });
    fireEvent.click(button);
    
    // Cierra el contenedor flotante
    fireEvent.mouseLeave(icon);

    expect(screen.queryByText('Título de Prueba')).not.toBeInTheDocument();
  });
});
