import React from 'react';
import { render, screen } from '@testing-library/react';
import AgreementUserTable from './AgreementUserTable';

describe('AgreementUserTable Component', () => {
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
    render(<AgreementUserTable agreements={agreementsMock} />);

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

  test('renderiza correctamente la tabla vacía', () => {
    render(<AgreementUserTable agreements={[]} />);

    // Verificar que no haya filas en el cuerpo de la tabla
    expect(screen.queryByText('Colombia')).not.toBeInTheDocument();
    expect(screen.queryByText('Argentina')).not.toBeInTheDocument();
  });
});
