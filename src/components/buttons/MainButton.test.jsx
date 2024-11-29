import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MainButton from './MainButton'; // Asegúrate de que la ruta es correcta

describe('MainButton component', () => {
  const mockOnClick = vi.fn(); // Crea una función simulada

  it('renders correctly with given props', () => {
    render(
      <MainButton
        onClick={mockOnClick}
        bgColor="blue-500"
        hoverBg="blue-700"
        textColor="white"
        text="Click Me"
        className="extra-class"
      />
    );

    // Verifica que el texto se renderiza correctamente
    const button = screen.getByText('Click Me');
    expect(button).not.toBeNull();  // Usamos .not.toBeNull() en lugar de .toBeInTheDocument()

    // Verifica que el botón tenga las clases CSS correctas
    expect(button.classList.contains('bg-blue-500')).toBe(true);
    expect(button.classList.contains('text-white')).toBe(true);
    expect(button.classList.contains('hover:bg-blue-700')).toBe(true);
    expect(button.classList.contains('extra-class')).toBe(true);
  });

  it('calls onClick when clicked', () => {
    render(
      <MainButton
        onClick={mockOnClick}
        bgColor="green-500"
        hoverBg="green-700"
        textColor="black"
        text="Submit"
      />
    );

    // Simula un clic en el botón
    const button = screen.getByText('Submit');
    fireEvent.click(button);

    // Verifica que la función onClick se haya llamado
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('has default type of "button"', () => {
    render(
      <MainButton
        onClick={mockOnClick}
        bgColor="red-500"
        textColor="white"
        text="Default Type"
      />
    );

    // Verifica que el tipo de botón sea "button"
    const button = screen.getByText('Default Type');
    expect(button.getAttribute('type')).toBe('button');
  });
});
