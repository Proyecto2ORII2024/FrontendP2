import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomSelect from './CustomSelect';
import InfoBubble from '../infoBubble/InfoBubble';

jest.mock('../infoBubble/InfoBubble', () => jest.fn(() => <div>InfoBubble Mock</div>));

describe('CustomSelect Component', () => {
  const mockOptions = [
    { value: '1', text: 'Opción 1' },
    { value: '2', text: 'Opción 2' },
    { value: '3', text: 'Opción 3' },
  ];

  const mockInputInf = {
    id: 'selectTest',
    text: 'Selecciona una opción',
  };

  const mockOnChange = jest.fn();

  test('renders CustomSelect correctly', () => {
    render(
      <CustomSelect
        inputInf={mockInputInf}
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        bblInfo={{ title: 'Info Test' }}
      />
    );

    // Verificar que el select se renderiza correctamente
    expect(screen.getByText('Selecciona una opción')).toBeInTheDocument();
  });

  test('opens and closes the menu on button click', () => {
    render(
      <CustomSelect
        inputInf={mockInputInf}
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        bblInfo={{ title: 'Info Test' }}
      />
    );

    const selectButton = screen.getByRole('button');
    
    // Al hacer clic, el menú debe abrirse
    fireEvent.click(selectButton);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();

    // Al hacer clic nuevamente, el menú debe cerrarse
    fireEvent.click(selectButton);
    expect(screen.queryByPlaceholderText('Buscar...')).not.toBeInTheDocument();
  });

  test('filters options based on search input', () => {
    render(
      <CustomSelect
        inputInf={mockInputInf}
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        bblInfo={{ title: 'Info Test' }}
      />
    );

    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    // Ingresar un texto en el input de búsqueda
    const searchInput = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(searchInput, { target: { value: 'Opción 2' } });

    // Verificar que solo la opción 2 esté visible
    expect(screen.getByText('Opción 2')).toBeInTheDocument();
    expect(screen.queryByText('Opción 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Opción 3')).not.toBeInTheDocument();
  });

  test('calls onChange when an option is selected', () => {
    render(
      <CustomSelect
        inputInf={mockInputInf}
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        bblInfo={{ title: 'Info Test' }}
      />
    );

    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);

    // Seleccionar la opción 1
    const option = screen.getByText('Opción 1');
    fireEvent.click(option);

    // Verificar que la función onChange fue llamada con el valor correcto
    expect(mockOnChange).toHaveBeenCalledWith('1');
  });
});
