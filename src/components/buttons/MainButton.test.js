import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainButton from './MainButton';

describe('MainButton Component', () => {
  const onClickMock = jest.fn();

  test('renderiza correctamente con el texto y estilos adecuados', () => {
    render(
      <MainButton
        text="Click me"
        bgColor="blue-500"
        textColor="white"
        hoverBg="blue-700"
        className="custom-class"
        onClick={onClickMock}
      />
    );

    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-500');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('hover:bg-blue-700');
    expect(button).toHaveClass('custom-class');
  });

  test('dispara la función onClick al hacer clic', () => {
    render(
      <MainButton
        text="Click me"
        onClick={onClickMock}
      />
    );

    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('usa el tipo de botón por defecto si no se especifica', () => {
    render(<MainButton text="Click me" onClick={onClickMock} />);

    const button = screen.getByText('Click me');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('aplica el tipo de botón especificado', () => {
    render(<MainButton text="Submit" type="submit" onClick={onClickMock} />);

    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
