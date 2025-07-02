import { render, screen } from '@testing-library/react';
import HomePage from '../components/pages/HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage', () => {
  test('TEST HOME - Renderizado de secciones principales', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Verificar si se estan cargando los textos principales en la homepage
    expect(screen.getByText(/seguí tu envío/i)).toBeInTheDocument();
    expect(screen.getByText(/gestiona tu pedido con nosotros/i)).toBeInTheDocument();
    expect(screen.getByText(/nuestra misión/i)).toBeInTheDocument();
    expect(screen.getByText(/¿por qué elegirnos\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /programar un envío/i })).toBeInTheDocument();
  });
});
