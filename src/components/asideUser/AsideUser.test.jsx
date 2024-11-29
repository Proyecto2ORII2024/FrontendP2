import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Necesario para simular la navegación
import AsideUser from './AsideUser'; // Asegúrate de que la ruta sea correcta
import { AuthContext } from '../../context/LoginContext'; // Asegúrate de que la ruta es correcta

describe('AsideUser', () => {
  it('renders title, menus, and logout button correctly', () => {
    const mockSingout = vi.fn(); // Mock de la función singout

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ singout: mockSingout }}>
          <AsideUser open={true} setOpen={vi.fn()} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Verifica que el título "Oficina de Relaciones Internacionales e Interinstitucionales" esté presente
    const title = screen.getByText(/Oficina de Relaciones Internacionales e Interinstitucionales/i);
    expect(title).toBeTruthy();  // Usamos toBeTruthy() para verificar que el título está presente

    // Verifica que los menús estén presentes
    const menuItems = [
      "Inicio",
      "Convenios",
      "Formularios",
      "Cambiar Contraseña"
    ];
    
    menuItems.forEach((menuItem) => {
      expect(screen.getByText(menuItem)).toBeTruthy();  // Verificamos que cada menú esté presente
    });

    // Verifica que el botón de "Cerrar sesión" esté presente
    const logoutButton = screen.getByText(/Cerrar Sesión/i);
    expect(logoutButton).toBeTruthy();  // Verificamos que el botón de Cerrar Sesión esté presente

    // Verifica que la función "singout" se llama cuando se hace clic en el botón de cerrar sesión
    fireEvent.click(logoutButton);
    expect(mockSingout).toHaveBeenCalled();  // Verificamos que la función mockSingout haya sido llamada
  });
});
