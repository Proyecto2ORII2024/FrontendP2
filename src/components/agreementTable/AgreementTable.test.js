import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AgreementTable from './AgreementTable';

describe('AgreementTable Component', () => {
  const mockSetOpen = jest.fn();
  const mockSetAgreementId = jest.fn();
  const mockSetOpenDelete = jest.fn();
  
  const agreementsMock = [
    {
      id: 1,
      country: 'Colombia',
      institution: 'Universidad Nacional',
      agreementNumber: '12345',
      description: 'Convenio de colaboración',
      startDate: '2023-01-01',
    },
    {
      id: 2,
      country: 'Argentina',
      institution: 'Universidad de Buenos Aires',
      agreementNumber: '67890',
      description: 'Intercambio académico',
      startDate: '2023-06-15',
    },
  ];

  test('renderiza los datos de los acuerdos en la tabla', () => {
    render(
      <AgreementTable
        agreements={agreementsMock}
        setOpen={mockSetOpen}
        setAgreementId={mockSetAgreementId}
        setOpenDelete={mockSetOpenDelete}
      />
    );

    // Verificar que los datos del primer acuerdo están en la tabla
    expect(screen.getByText('Colombia')).toBeInTheDocument();
    expect(screen.getByText('Universidad Nacional')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Convenio de colaboración')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();

    // Verificar que los datos del segundo acuerdo están en la tabla
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByText('Universidad de Buenos Aires')).toBeInTheDocument();
    expect(screen.getByText('67890')).toBeInTheDocument();
    expect(screen.getByText('Intercambio académico')).toBeInTheDocument();
    expect(screen.getByText('2023-06-15')).toBeInTheDocument();
  });

  test('llama a setOpen y setAgreementId cuando se hace clic en el botón de editar', () => {
    render(
      <AgreementTable
        agreements={agreementsMock}
        setOpen={mockSetOpen}
        setAgreementId={mockSetAgreementId}
        setOpenDelete={mockSetOpenDelete}
      />
    );

    const editButtons = screen.getAllByAltText('editIcom');
    fireEvent.click(editButtons[0]); // Hacemos clic en el primer botón de editar

    expect(mockSetOpen).toHaveBeenCalledWith(true);
    expect(mockSetAgreementId).toHaveBeenCalledWith('1'); // Debe llamar con el id correcto del acuerdo
  });

  test('llama a setOpenDelete y setAgreementId cuando se hace clic en el botón de eliminar', () => {
    render(
      <AgreementTable
        agreements={agreementsMock}
        setOpen={mockSetOpen}
        setAgreementId={mockSetAgreementId}
        setOpenDelete={mockSetOpenDelete}
      />
    );

    const deleteButtons = screen.getAllByAltText('deleteIcon');
    fireEvent.click(deleteButtons[1]); // Hacemos clic en el segundo botón de eliminar

    expect(mockSetOpenDelete).toHaveBeenCalledWith(true);
    expect(mockSetAgreementId).toHaveBeenCalledWith('2'); // Debe llamar con el id correcto del acuerdo
  });
});
