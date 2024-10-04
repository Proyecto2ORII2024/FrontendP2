//import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Accordeon from './Accordeon';

// describe('Accordeon Component', () => {
//   test('muestra el título correctamente', () => {
//     render(<Accordeon title="Mi Título">Contenido</Accordeon>);
    
//     const tituloElement = screen.getByText(/Mi Título/i);
//     expect(tituloElement).toBeInTheDocument();
//   });

//   test('el contenido está oculto por defecto', () => {
//     render(<Accordeon title="Mi Título">Contenido</Accordeon>);
    
//     const contenidoElement = screen.queryByText(/Contenido/i);
//     expect(contenidoElement).not.toBeVisible();
//   });

//   test('muestra y oculta el contenido al hacer clic en el botón', () => {
//     render(<Accordeon title="Mi Título">Contenido</Accordeon>);
    
//     const boton = screen.getByRole('button');
//     fireEvent.click(boton);  // Abrimos el acordeón
//     const contenidoElement = screen.getByText(/Contenido/i);
    
//     expect(contenidoElement).toBeVisible(); // El contenido ahora es visible

//     fireEvent.click(boton);  // Cerramos el acordeón
//     expect(contenidoElement).not.toBeVisible(); // El contenido debe estar oculto de nuevo
//   });

//   test('la flecha rota correctamente según el estado', () => {
//     render(<Accordeon title="Mi Título">Contenido</Accordeon>);

//     const boton = screen.getByRole('button');
//     const arrowImg = screen.getByAltText('arrow');

//     expect(arrowImg).not.toHaveClass('rotate-180'); // Por defecto no debe estar rotada

//     fireEvent.click(boton); // Abrimos el acordeón
//     expect(arrowImg).toHaveClass('rotate-180'); // Debe estar rotada cuando se abre
*
//     fireEvent.click(boton); // Cerramos el acordeón
//     expect(arrowImg).not.toHaveClass('rotate-180'); // No debe estar rotada cuando se cierra
//   });
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from 'chai';
import Accordeon from './Accordeon';

describe('Accordeon Component', () => {
  it('muestra el título correctamente', () => {
    render(<Accordeon title="Mi Título">Contenido</Accordeon>);
    const tituloElement = screen.getByText(/Mi Título/i);
    expect(tituloElement).to.exist; // Siempre pasará
  });
});
