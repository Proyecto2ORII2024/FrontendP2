import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomSelect from './CustomSelect'; // Asegúrate de que la ruta sea correcta

describe('CustomSelect', () => {
  it('renders the select field correctly', () => {
    const inputProps = {
      inputInf: {
        id: 'testSelect',
        text: 'Test Select',
        required: true,
      },
      options: [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
      ],
      value: '1', // Valor seleccionado por defecto
      onChange: () => {}, // Mock de la función onChange
      bblInfo: { title: 'Info title' }, // InfoBubble
    };

    render(<CustomSelect {...inputProps} />);

    // Verifica que el campo de selección está renderizado
    const selectField = screen.getByText('Test Select');
    expect(selectField).toBeTruthy(); // Verifica que el campo está presente en el DOM
  });
});
