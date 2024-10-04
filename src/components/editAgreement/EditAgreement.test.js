import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditAgreement from './EditAgreement';
import * as agreementService from '../../services/agreement.service.js';
import MainButton from '../buttons/MainButton.jsx';

jest.mock('../buttons/MainButton', () => jest.fn(({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)));

describe('EditAgreement Component', () => {
  const mockSetOpen = jest.fn();
  const mockSetUpdated = jest.fn();
  const mockAgreementId = '12345';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders EditAgreement when open is true', () => {
    const mockGetAgreement = jest.spyOn(agreementService, 'getAgreement').mockResolvedValue({
      data: {
        country: 'Colombia',
        agreementNumber: '123',
        institution: 'Institución X',
        startDate: '2023-01-01',
        scope: 'NATIONAL',
        description: 'Descripción del acuerdo'
      }
    });

    render(
      <EditAgreement
        agreementId={mockAgreementId}
        open={true}
        setOpen={mockSetOpen}
        setUpdated={mockSetUpdated}
      />
    );

    expect(screen.getByText('A continuación edite los campos que considere prudente sin dejar campos vacios.')).toBeInTheDocument();

    // Verifica que los campos se llenen con los datos del acuerdo
    waitFor(() => {
      expect(screen.getByDisplayValue('Colombia')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Institución X')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2023-01-01')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Descripción del acuerdo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('NATIONAL')).toBeInTheDocument();
    });

    mockGetAgreement.mockRestore(); // Restablece el espía
  });

  test('does not render when open is false', () => {
    render(
      <EditAgreement
        agreementId={mockAgreementId}
        open={false}
        setOpen={mockSetOpen}
        setUpdated={mockSetUpdated}
      />
    );

    expect(screen.queryByText('A continuación edite los campos que considere prudente sin dejar campos vacios.')).not.toBeInTheDocument();
  });

  test('submits form with correct data', async () => {
    const mockUpdateAgreement = jest.spyOn(agreementService, 'updateAgreement').mockResolvedValue({
      status: 200,
    });

    render(
      <EditAgreement
        agreementId={mockAgreementId}
        open={true}
        setOpen={mockSetOpen}
        setUpdated={mockSetUpdated}
      />
    );

    // Simula la carga de datos
    await waitFor(() => {
      expect(screen.getByDisplayValue('Colombia')).toBeInTheDocument();
    });

    // Completa el formulario
    fireEvent.change(screen.getByPlaceholderText('Pais'), { target: { value: 'Argentina' } });
    fireEvent.change(screen.getByPlaceholderText('Codigo'), { target: { value: '456' } });
    fireEvent.change(screen.getByPlaceholderText('Institución'), { target: { value: 'Institución Y' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción...'), { target: { value: 'Nueva descripción' } });

    const saveButton = screen.getByText('Guardar');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateAgreement).toHaveBeenCalledWith(
        {
          country: 'Argentina',
          agreementNumber: '456',
          institution: 'Institución Y',
          startDate: expect.any(String),
          scope: expect.any(String),
          description: 'Nueva descripción',
        },
        mockAgreementId
      );
      expect(mockSetUpdated).toHaveBeenCalledWith('success');
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
  });

  test('handles error when updateAgreement fails', async () => {
    const mockUpdateAgreement = jest.spyOn(agreementService, 'updateAgreement').mockResolvedValue({
      status: 500,
    });

    render(
      <EditAgreement
        agreementId={mockAgreementId}
        open={true}
        setOpen={mockSetOpen}
        setUpdated={mockSetUpdated}
      />
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Colombia')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Pais'), { target: { value: 'Argentina' } });
    fireEvent.change(screen.getByPlaceholderText('Codigo'), { target: { value: '456' } });
    fireEvent.change(screen.getByPlaceholderText('Institución'), { target: { value: 'Institución Y' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción...'), { target: { value: 'Nueva descripción' } });

    const saveButton = screen.getByText('Guardar');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateAgreement).toHaveBeenCalled();
      expect(mockSetUpdated).toHaveBeenCalledWith('error');
    });
  });

  test('shows validation errors when fields are empty', async () => {
    const mockGetAgreement = jest.spyOn(agreementService, 'getAgreement').mockResolvedValue({
      data: {
        country: 'Colombia',
        agreementNumber: '123',
        institution: 'Institución X',
        startDate: '2023-01-01',
        scope: 'NATIONAL',
        description: 'Descripción del acuerdo'
      }
    });

    render(
      <EditAgreement
        agreementId={mockAgreementId}
        open={true}
        setOpen={mockSetOpen}
        setUpdated={mockSetUpdated}
      />
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Colombia')).toBeInTheDocument();
    });

    // Deja campos vacíos
    fireEvent.change(screen.getByPlaceholderText('Pais'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Codigo'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Institución'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción...'), { target: { value: '' } });

    const saveButton = screen.getByText('Guardar');
    fireEvent.click(saveButton);

    expect(await screen.findByText('Este campo es requerido')).toBeInTheDocument();
  });
});
