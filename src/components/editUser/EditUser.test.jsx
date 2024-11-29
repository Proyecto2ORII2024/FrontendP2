import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EditUser from './EditUser'; // Asegúrate de que la ruta sea correcta

describe('EditUser', () => {
  it('renders the edit user form correctly', () => {
    const mockUser = {
      userId: '1',
      email: 'user@example.com',
      role: 'USER',
      faculty: 'FIET'
    };

    const setOpen = () => {};
    const setUpdated = () => {};
    const updateData = () => {};

    render(
      <EditUser
        user={mockUser}
        open={true}
        setOpen={setOpen}
        setUpdated={setUpdated}
        updateData={updateData}
      />
    );

    // Verifica que el título de la edición esté presente
    const title = screen.getByText('Se puede modificar el correo o la contraseña o ambos.');
    expect(title).toBeTruthy();

    // Verifica que los campos del formulario están presentes
    const emailInput = screen.getByPlaceholderText('Correo');
    expect(emailInput).toBeTruthy();
    
    const roleSelect = screen.getByLabelText('Rol');
    expect(roleSelect).toBeTruthy();

    const facultySelect = screen.getByLabelText('Facultad');
    expect(facultySelect).toBeTruthy();

    const saveButton = screen.getByText('Guardar');
    expect(saveButton).toBeTruthy();
  });
});
