import React from 'react';
import FormBuilder from '../FormBuilder';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL, ROUTES } from '../../lib/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';

const schema = z.object({
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { verificarAutenticacion } = useAuth()
  
  const onSubmit = async (data) => {
    // El token recaptcha lo recibe el FormBuilder y lo pasa acá dentro de data
    const { email, password, recaptchaToken } = data;

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, recaptchaToken }),
    });
      const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Error al loguear');
    }
    verificarAutenticacion();
    navigate('/user/dashboard');
  };

  const { setValue, formState: { errors }, control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormBuilder
      title="Iniciar sesión"
      description="Accedé a tu cuenta para gestionar tus envíos"
      background={'bg-dubraPrimary'}
      setValue={setValue}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit}
      fields={[
        { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'nombre@ejemplo.com' },
        { name: 'password', label: 'Contraseña', type: 'password', placeholder: '******' },
      ]}
      schema={schema}
      defaultValues={{
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
      footer={
        <p className="text-md text-muted-foreground">
          ¿No tenés una cuenta?{' '}
          <Link to={ROUTES.REGISTER} className="text-terracotta hover:underline">
            Registrate
          </Link>
        </p>
      }
    />
  );
}