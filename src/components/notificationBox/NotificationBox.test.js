import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationBox from './NotificationBox';

// Mock de la función setOpen
const mockSetOpen = jest.fn();

describe('Componente NotificationBox', () => {
  const title = 'Título de Notificación';
  const children = <p>Contenido de la notificación.</p>;

  beforeEach(() => {
    jest.clearAllMocks(); // Limpia las llamadas previas a mockSetOpen
  });

  test('renderiza correctamente la notificación', () => {
    render(<NotificationBox type="info" title={title} open={true} setOpen={mockSetOpen}>{children}</NotificationBox>);
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Contenido de la notificación.')).toBeInTheDocument();
  });

  test('cierra la notificación al hacer clic en el botón', () => {
    render(<NotificationBox type="info" title={title} open={true} setOpen={mockSetOpen}>{children}</NotificationBox>);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test('se cierra automáticamente después de 10 segundos', () => {
    jest.useFakeTimers(); // Usa temporizadores simulados
    render(<NotificationBox type="info" title={title} open={true} setOpen={mockSetOpen}>{children}</NotificationBox>);
    
    expect(mockSetOpen).not.toHaveBeenCalled();

    // Avanza el tiempo en 10 segundos
    jest.advanceTimersByTime(10000);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
    jest.useRealTimers(); // Restablece los temporizadores reales
  });

  test('no hace nada si está cerrado', () => {
    render(<NotificationBox type="info" title={title} open={false} setOpen={mockSetOpen}>{children}</NotificationBox>);
    
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(mockSetOpen).not.toHaveBeenCalled();
  });
});
