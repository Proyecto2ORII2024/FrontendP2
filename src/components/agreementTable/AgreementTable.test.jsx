import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AgreementTable from './AgreementTable'; // Asegúrate de que la ruta sea correcta

describe('AgreementTable', () => {
  it('renders table with agreements data', () => {
    const agreements = [
      {
        agreementId: '1',
        country: 'Country A',
        institution: 'Institution A',
        agreementNumber: '123',
        description: 'Agreement description A',
        startDate: '2022-01-01'
      }
    ];

    render(
      <AgreementTable
        agreements={agreements}
        setOpen={vi.fn()}
        setAgreementId={vi.fn()}
        setOpenDelete={vi.fn()}
        setAgreementSelected={vi.fn()}
      />
    );

    // Verifica que los convenios se rendericen correctamente
    agreements.forEach((agreement) => {
      expect(screen.getByText(agreement.country)).toBeTruthy();
      expect(screen.getByText(agreement.institution)).toBeTruthy();
      expect(screen.getByText(agreement.agreementNumber)).toBeTruthy();
      expect(screen.getByText(agreement.description)).toBeTruthy();
      expect(screen.getByText(agreement.startDate)).toBeTruthy();
    });
  });

});
