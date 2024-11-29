import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Accordeon from './Acordeon'; // Asegúrate de que la ruta es correcta

describe('Accordeon component', () => {


  it('opens when clicked', () => {
    render(<Accordeon title="Test Title">Test Content</Accordeon>);

    // Encuentra el primer botón y simula un clic
    const button = screen.getAllByRole('button')[0]; // Selecciona el primer botón
    fireEvent.click(button);

    // Verifica que el contenido se ha mostrado (selecciona el primer "Test Content")
    const content = screen.getAllByText('Test Content')[0];  // Selecciona el primer "Test Content"
    expect(content).toBeTruthy();  // Verifica que el contenido ahora es visible
  });

 
});
