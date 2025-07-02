import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../components/auth/RegisterForm';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock de la función navigate para controlar y verificar las navegaciones en los tests
const mockNavigate = vi.fn();

// Mock react-router-dom para que use la función mockNavigate cuando useNavigate es llamada
// Para verificar que la navegación se realiza correctamente en los tests
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Variable para controlar si mi mock de reCAPTCHA debe enviar un token o no (Ya que se simula el token)
let sendToken = true;

// Mock del componente reCAPTCHA para no depender del servicio real en los tests 
// Simulación que el reCAPTCHA envía un token falso o no, según la variable sendToken
vi.mock('react-google-recaptcha', () => {
  return {
    default: ({ onChange }) => {
      React.useEffect(() => {
        if (sendToken) {
          onChange('fake-recaptcha-token');
        }
      }, []);
      return (
        <div data-testid="recaptcha-mock">
          {sendToken ? 'reCAPTCHA mock con token' : 'reCAPTCHA mock sin token'}
        </div>
      );
    },
  };
});

// Mock global fetch para poder controlar las respuestas de la API en los tests
global.fetch = vi.fn();

// Función auxiliar para renderizar el formulario dentro del router
const renderRegisterForm = () => {
  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );
};

// Función auxiliar para llenar el formulario con los datos indicados
const fillRegisterForm = ({
  name = '',
  email = '',
  rut = '',
  password = '',
  confirmPassword = '',
}) => {
  fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/rut de empresa/i), { target: { value: rut } });
  fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: password } });
  fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: confirmPassword } });
};

describe('RegisterForm', () => {
  // Limpia los mocks antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
    sendToken = true;
  });

  test('REGISTER TEST - Renderiza y hace register correctamente', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Test',
            email: 'test@email.com',
            password: '@AAAaaa111',
            confirmPassword: '@AAAaaa111',
            rut: '123456789123',
            recaptchaToken: 'fake-recaptcha-token',
          }),
        })
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('REGISTER TEST - Incumplimiento de recaptcha', async () => {
    sendToken = false;

    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/por favor completá el recaptcha/i)).toBeInTheDocument();
    });

    expect(fetch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Nombre es inválido', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'T',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/el nombre es obligatorio, minimo 3 caracteres/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Email es inválido', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'invalid-email',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Contraseña es inválida', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: '123',
      confirmPassword: '123',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Contraseña sin mayúsculas', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: 'abc123@',
      confirmPassword: 'abc123@',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/debe contener al menos una letra mayúscula/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Contraseña sin minúsculas', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: 'ABC123@',
      confirmPassword: 'ABC123@',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/debe contener al menos una letra minúscula/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Contraseña sin número', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: 'Abcdef@',
      confirmPassword: 'Abcdef@',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/debe contener al menos un número/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Contraseña sin símbolo', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: 'Abc1234',
      confirmPassword: 'Abc1234',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/debe contener al menos un símbolo/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Confirmación de contraseña es inválida', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '123',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/confirmación obligatoria/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
  
  test('REGISTER TEST - Contraseñas no coinciden', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@BBBbbb222',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - RUT es inválido', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/el rut es obligatorio, minimo 12 caracteres/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('REGISTER TEST - Muestra estado de carga mientras se envía el formulario', async () => {
    let resolveFetch;
    fetch.mockImplementationOnce(() => new Promise((resolve) => (resolveFetch = resolve)));

    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/procesando/i);
    });

    resolveFetch({ ok: true, json: async () => ({}) });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('REGISTER TEST - Permite ingresar datos validos en inputs del formulario', () => {
    renderRegisterForm();
    fillRegisterForm({
      name: 'Test',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    expect(screen.getByLabelText(/nombre completo/i).value).toBe('Test');
    expect(screen.getByLabelText(/correo electrónico/i).value).toBe('test@email.com');
    expect(screen.getByLabelText(/rut de empresa/i).value).toBe('123456789123');
    expect(screen.getByLabelText(/^contraseña$/i).value).toBe('@AAAaaa111');
    expect(screen.getByLabelText(/confirmar contraseña/i).value).toBe('@AAAaaa111');
  });

  test('REGISTER TEST - Rechazar entrada con scripts en el nombre', async () => {
    renderRegisterForm();
    fillRegisterForm({
      name: '<script>alert("x")</script>',
      email: 'test@email.com',
      rut: '123456789123',
      password: '@AAAaaa111',
      confirmPassword: '@AAAaaa111',
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(await screen.findByText(/el nombre contiene caracteres inválidos/i)).toBeInTheDocument();
  });
});
