import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DeleteUser from './DeleteUser'; // Asegúrate de que la ruta sea correcta

describe('DeleteUser', () => {
  it('renders the delete confirmation dialog', () => {
    const setOpen = () => {};
    const setDeleted = () => {};
    const handleDelete = () => {};

    render(
      <DeleteUser
        open={true}
        setOpen={setOpen}
        userId="user123"
        setDeleted={setDeleted}
        handleDelete={handleDelete}
      />
    );

    // Verifica que el título "¿Desea eliminar este usuario?" esté presente
    const title = screen.getByText('¿Desea eliminar este usuario?');
    expect(title).toBeTruthy();  // Usa toBeTruthy() en lugar de toBeInTheDocument
  });
});
