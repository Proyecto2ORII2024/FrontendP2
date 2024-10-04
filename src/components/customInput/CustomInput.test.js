import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomInput from './CustomInput';
import InfoBubble from '../infoBubble/InfoBubble';
import { useForm } from 'react-hook-form';

jest.mock('../infoBubble/InfoBubble', () => jest.fn(() => <div>InfoBubble Mock</div>));

describe('CustomInput Component', () => {
  const mockBubbleInf = {
    title: 'Info Title',
    shortInfo: 'Short Info',
    longInfo: {
      text: ['Detailed info'],
      list: { item1: 'List Item 1' }
    }
  };

  const mockInputInf = {
    id: 'testInput',
    text: 'Test Input',
    type: 'text',
    required: true
  };

  const mockRegister = jest.fn();
  const mockErrors = {};

  test('renders CustomInput correctly', () => {
    render(
      <CustomInput
        bubbleInf={mockBubbleInf}
        inputInf={mockInputInf}
        register={mockRegister}
        errors={mockErrors}
      />
    );

    // Verificar que el texto del input se renderiza
    expect(screen.getByText('Test Input')).toBeInTheDocument();
    // Verificar que el input se renderiza con el id correcto
    const input = screen.getByPlaceholderText('Test Input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'testInput');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('shows error message when input is invalid', () => {
    const mockErrorsWithInput = {
      testInput: {
        message: 'Este campo es requerido'
      }
    };

    render(
      <CustomInput
        bubbleInf={mockBubbleInf}
        inputInf={mockInputInf}
        register={mockRegister}
        errors={mockErrorsWithInput}
      />
    );

    // Verificar que se muestra el mensaje de error
    expect(screen.getByText('Este campo es requerido')).toBeInTheDocument();
  });

  test('calls register function correctly', () => {
    render(
      <CustomInput
        bubbleInf={mockBubbleInf}
        inputInf={mockInputInf}
        register={mockRegister}
        errors={mockErrors}
      />
    );

    // Verificar que la función register es llamada correctamente
    expect(mockRegister).toHaveBeenCalledWith('testInput', { required: true });
  });
});
