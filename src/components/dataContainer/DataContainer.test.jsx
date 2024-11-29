
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DataContainer from './DataContainer'; // Asegúrate de que la ruta sea correcta

describe('DataContainer', () => {
  it('renders the container with the correct title', () => {
    render(
      <DataContainer title="Test Title">
        <div>Child Content</div>
      </DataContainer>
    );

    // Verifica que el título se haya renderizado correctamente
    const title = screen.getByText('Test Title');
    expect(title).toBeTruthy(); // Verifica que el título esté presente en el DOM
  });
});
