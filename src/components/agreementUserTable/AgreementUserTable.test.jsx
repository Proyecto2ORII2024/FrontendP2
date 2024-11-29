import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AgreementUserTable from './AgreementUserTable'; // Asegúrate de que la ruta sea correcta

describe('AgreementUserTable', () => {
  it('renders table with agreements data', () => {
    const agreements = [
      {
        agreementId: '1',
        country: 'Country A',
        institution: 'Institution A',
        agreementNumber: '123',
        description: 'Agreement description A',
        startDate: '2022-01-01',
      },
      {
        agreementId: '2',
        country: 'Country B',
        institution: 'Institution B',
        agreementNumber: '456',
        description: 'Agreement description B',
        startDate: '2023-01-01',
      }
    ];

    render(<AgreementUserTable agreements={agreements} />);

    // Verifica que los datos de los convenios se rendericen correctamente
    agreements.forEach((agreement) => {
      expect(screen.getByText(agreement.country)).toBeTruthy();
      expect(screen.getByText(agreement.institution)).toBeTruthy();
      expect(screen.getByText(agreement.agreementNumber)).toBeTruthy();
      expect(screen.getByText(agreement.description)).toBeTruthy();
      expect(screen.getByText(agreement.startDate)).toBeTruthy();
    });
  });
});
