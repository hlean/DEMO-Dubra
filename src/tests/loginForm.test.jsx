import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/auth/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock de la funcion navigate para controlar y verificar las navegaciones en los tests
const mockNavigate = vi.fn();

// Mock react-router-dom para que use la función mockNavigate cuando useNavigate es llamada
// Sirve para verificar que la navegación se realiza correctamente en los tests
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Variable para controlar si el mock de reCAPTCHA debe enviar un token falso o no (Ya que se simula el token)
let sendToken = true;

// Mock del componente reCAPTCHA para no depender del servicio real en los tests 
// Simulación que el reCAPTCHA envía un token falso o no, según la variable sendToken
vi.mock('react-google-recaptcha', () => {
  return {
    default: ({ onChange }) => {
      React.useEffect(() => {
        if (sendToken) {
          onChange('fake-recaptcha-token'); // Se envía un token falso
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
const renderLoginForm = () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
};

// Función auxiliar para llenar el formulario con los datos indicados
const fillLoginForm = ({ email = '', password = '' }) => {
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/contraseña/i), {
    target: { value: password },
  });
};

describe('LoginForm', () => {
  // Se limpian los mocks y se setea el sendToken en true (enviar token por defecto)
  beforeEach(() => {
    vi.clearAllMocks();
    sendToken = true;
  });

  test('LOGIN TEST - Renderiza y hace login correctamente', async () => {
    // Se simula que la API responde correctamente al login
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    // Renderiza el formulario y completa los datos válidos
    renderLoginForm();
    fillLoginForm({ email: 'test@email.com', password: '@AAAaaa111' });

    // Se simula el click en el botón de iniciar sesión
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Se espera que fetch haya sido llamado con la URL y body correcto (incluyendo el token fake del reCAPTCHA)
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@email.com',
            password: '@AAAaaa111',
            recaptchaToken: 'fake-recaptcha-token',
          }),
        })
      );
    });

    // Se espera que al terminar el login, la navegación a /dashboard ocurra
    // Esto indica que el login fue exitoso y se redirigió al usuario
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('LOGIN TEST - Incumplimiento de recaptcha', async () => {
    // Seteo para que el mock de reCAPTCHA no envíe token para simular el error
    sendToken = false;

    renderLoginForm();
    fillLoginForm({ email: 'test@email.com', password: '@AAAaaa111' });

    // Se intenta enviar el formulario sin token válido de reCAPTCHA
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Se espera que se muestre el mensaje de error relacionado al reCAPTCHA faltante
    await waitFor(() => {
      expect(screen.getByText(/por favor completá el recaptcha/i)).toBeInTheDocument();
    });

    // También se verifica que no se haya hecho la llamada fetch ni la navegación
    // Esto indica que el login no se realizó porque faltaba el token de reCAPTCHA
    expect(fetch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('LOGIN TEST - Falla general del login', async () => {
    // Se simula que la API responde con error en el login por datos incorrectos
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Usuario o contraseña inválidos' }),
    });

    renderLoginForm();
    fillLoginForm({ email: 'invalid@email.com', password: 'invalidPassword' });

    // Se intenta enviar el formulario con los datos incorrectos
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Se espera que se muestre el mensaje de error recibido de la API
    await waitFor(() => {
      expect(screen.getByText(/usuario o contraseña inválidos/i)).toBeInTheDocument();
    });

    // Se verifica que no se haya realizado la navegación
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('LOGIN TEST - Campos están vacíos', async () => {
    // Renderiza el LoginForm sin completar ningún campo
    renderLoginForm();

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Espera que aparezcan los mensajes de validación de Zod
    await waitFor(() => {
      expect(screen.getByText(/el email es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });

    // Verifica que no se haya hecho la llamada fetch porque la validación falló
    expect(fetch).not.toHaveBeenCalled();
  });

  test('LOGIN TEST - Permite ingresar datos validos en inputs del formulario', () => {
    renderLoginForm();

    fillLoginForm({ email: 'test@email.com', password: '@AAAaaa111' });

    // Verifica que los inputs se hayan actualizado con el valor ingresado
    expect(screen.getByLabelText(/correo electrónico/i).value).toBe('test@email.com');
    expect(screen.getByLabelText(/contraseña/i).value).toBe('@AAAaaa111');
  });

  test('LOGIN TEST - Muestra estado de carga mientras se envía el formulario', async () => {
    // Se define una variable para controlar cuándo se resuelve la promesa de fetch
    let resolveFetch;
    fetch.mockImplementationOnce(() => new Promise((resolve) => (resolveFetch = resolve)));

    renderLoginForm();
    fillLoginForm({ email: 'test@email.com', password: '@AAAaaa111' });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Espera que el botón cambie a "Procesando..." durante la solicitud
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/procesando/i);
    });

    // Simula que la promesa se resuelve exitosamente
    resolveFetch({ ok: true, json: async () => ({}) });

    // Verifica que después se navega al dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
