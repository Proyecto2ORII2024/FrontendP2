import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EditAgreement from './EditAgreement'; // Asegúrate de que la ruta sea correcta

describe('EditAgreement', () => {
  it('renders the edit agreement form correctly', () => {
    const mockAgreement = {
      agreementId: '123',
      country: 'Country A',
      agreementNumber: 'ABC123',
      institution: 'Institution A',
      startDate: '2023-01-01',
      scope: 'NATIONAL',
      description: 'Agreement description here'
    };
    
    const setOpen = () => {};
    const setUpdated = () => {};

    render(
      <EditAgreement
        agreement={mockAgreement}
        open={true}
        setOpen={setOpen}
        setUpdated={setUpdated}
      />
    );

    // Verifica que el título de la edición esté presente
    const title = screen.getByText('A continuación edite los campos que considere prudente sin dejar campos vacios.');
    expect(title).toBeTruthy();

    // Verifica que los campos del formulario están presentes
    const countryInput = screen.getByPlaceholderText('Pais');
    expect(countryInput).toBeTruthy();
    const codeInput = screen.getByPlaceholderText('Codigo');
    expect(codeInput).toBeTruthy();
    const institutionInput = screen.getByPlaceholderText('Institución');
    expect(institutionInput).toBeTruthy();
    const descriptionInput = screen.getByPlaceholderText('Descripción...');
    expect(descriptionInput).toBeTruthy();
  });
});
