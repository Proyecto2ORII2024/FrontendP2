
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteAgreement from './DeleteAgreement';
import * as agreementService from '../../services/agreement.service';
import MainButton from '../buttons/MainButton';

jest.mock('../buttons/MainButton', () => jest.fn(({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)));

describe('DeleteAgreement Component', () => {
  const mockSetOpen = jest.fn();
  const mockSetDeleted = jest.fn();
  const mockAgreementId = '12345';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders DeleteAgreement when open is true', () => {
    render(
      <DeleteAgreement
        open={true}
        setOpen={mockSetOpen}
        agreementId={mockAgreementId}
        setDeleted={mockSetDeleted}
      />
    );

    expect(screen.getByText('¿Desea eliminar el convenio?')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Aceptar')).toBeInTheDocument();
  });

  test('does not render when open is false', () => {
    render(
      <DeleteAgreement
        open={false}
        setOpen={mockSetOpen}
        agreementId={mockAgreementId}
        setDeleted={mockSetDeleted}
      />
    );

    expect(screen.queryByText('¿Desea eliminar el convenio?')).not.toBeInTheDocument();
  });

  test('calls setOpen with false when cancel button is clicked', () => {
    render(
      <DeleteAgreement
        open={true}
        setOpen={mockSetOpen}
        agreementId={mockAgreementId}
        setDeleted={mockSetDeleted}
      />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test('calls deleteAgreement and sets deleted status to success on confirmation', async () => {
    const mockDeleteAgreement = jest.spyOn(agreementService, 'deleteAgreement').mockResolvedValue({
      status: 200,
    });

    render(
      <DeleteAgreement
        open={true}
        setOpen={mockSetOpen}
        agreementId={mockAgreementId}
        setDeleted={mockSetDeleted}
      />
    );

    const acceptButton = screen.getByText('Aceptar');
    fireEvent.click(acceptButton);
    
    expect(mockDeleteAgreement).toHaveBeenCalledWith(mockAgreementId);
    expect(mockSetDeleted).toHaveBeenCalledWith('success');
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test('sets deleted status to error if deleteAgreement fails', async () => {
    const mockDeleteAgreement = jest.spyOn(agreementService, 'deleteAgreement').mockResolvedValue({
      status: 500,
    });

    render(
      <DeleteAgreement
        open={true}
        setOpen={mockSetOpen}
        agreementId={mockAgreementId}
        setDeleted={mockSetDeleted}
      />
    );

    const acceptButton = screen.getByText('Aceptar');
    fireEvent.click(acceptButton);

    expect(mockDeleteAgreement).toHaveBeenCalledWith(mockAgreementId);
    expect(mockSetDeleted).toHaveBeenCalledWith('error');
  });
});
