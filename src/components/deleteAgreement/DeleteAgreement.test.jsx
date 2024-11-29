import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeleteAgreement from './DeleteAgreement'; // Asegúrate de que la ruta sea correcta

describe('DeleteAgreement', () => {
  it('renders the delete confirmation dialog', () => {
    const setOpen = vi.fn();
    const setDeleted = vi.fn();

    render(
      <DeleteAgreement
        open={true}
        setOpen={setOpen}
        agreementId="123"
        setDeleted={setDeleted}
      />
    );

    // Verifica que el texto del título esté presente
    const title = screen.getByText('¿Desea eliminar el convenio?');
    expect(title).toBeTruthy();

    // Verifica que los botones estén presentes
    const cancelButton = screen.getByText('Cancelar');
    const acceptButton = screen.getByText('Aceptar');

    expect(cancelButton).toBeTruthy();
    expect(acceptButton).toBeTruthy();
  });

});
