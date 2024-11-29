import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Filters from './Filters'; // Asegúrate de que la ruta sea correcta

describe('Filters', () => {
  it('renders the filter form correctly', () => {
    const setOpen = () => {};  // Mock de la función setOpen
    const open = true;  // Propiedad de prueba para abrir el formulario

    render(<Filters open={open} setOpen={setOpen} />);

    // Verifica que el título "Filtros" esté presente
    const title = screen.getByText('Filtros');
    expect(title).toBeTruthy();

    // Verifica que los selects estén presentes
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThan(0);

    // Verifica que los campos de fecha estén presentes
    const startDateInput = screen.getByPlaceholderText('F. Inicio de movilidad');
    expect(startDateInput).toBeTruthy();

    const endDateInput = screen.getByPlaceholderText('F. Fin de movilidad');
    expect(endDateInput).toBeTruthy();
  });
});
