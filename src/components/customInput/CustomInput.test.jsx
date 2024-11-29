import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomInput from './CustomInput'; // Asegúrate de que la ruta es correcta

describe('CustomInput', () => {
  it('renders input field and shows error message on invalid input', () => {
    const mockRegister = vi.fn(); // Mock de la función register
    const mockErrors = { testInput: { message: 'Invalid format' } }; // Simulamos un error en el input

    const inputProps = {
      inputInf: {
        id: 'testInput',
        text: 'Test Input',
        type: 'text',
        required: true,
        pattern: /^[A-Za-z]+$/,
        message: 'Invalid format',
      },
      bubbleInf: {
        title: 'Info title',
        shortInfo: 'Short info text',
        longInfo: { text: ['Detailed info'] },
      },
      register: mockRegister,
      errors: mockErrors,
    };

    render(<CustomInput {...inputProps} />);

    // Verifica que el campo de entrada se renderiza correctamente
    const inputField = screen.getByPlaceholderText('Test Input');
    expect(inputField).toBeTruthy(); // Usamos toBeTruthy() en lugar de toBeInTheDocument()

    // Simula el ingreso de datos inválidos (no coincide con el patrón)
    fireEvent.input(inputField, { target: { value: '123' } });

    // Verifica que el mensaje de error se muestra
    const errorMessage = screen.getByText('Invalid format');
    expect(errorMessage).toBeTruthy(); // Usamos toBeTruthy() en lugar de toBeInTheDocument()
  });
});
