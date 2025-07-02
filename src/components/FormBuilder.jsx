import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const FormError = ({ errors, name}) =>
  errors[name] ? <p className="text-sm text-red-500 font-bold">{errors[name].message}</p> : null;

export default function FormBuilder({
  title,
  description,
  fields,
  onSubmit,
  footer,
  background,
  children,
  recaptcha,
  control,
  handleSubmit,
  errors
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleFormSubmit = async (data) => {
    if (!recaptchaToken && recaptcha) {
      setError('Por favor completá el reCAPTCHA');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit({ ...data, recaptchaToken });
    } catch (err) {
      setError(err.message || 'Error inesperado');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className={`w-full max-w-xl h-fit ${background}`}>
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <div className={`items-end ${fields.length>3?'grid grid-cols-2 gap-3':''}`}>
            {fields.map(({ name, label, type = 'text', placeholder, children }, index) => (
              <div className={fields.length > 3 && index === fields.length - 1 && fields.length % 2 > 0? 'col-span-2' : ''} key={name}>
                <Label htmlFor={name} className='text-lg'>{label}</Label>
                <div className='flex gap-2 items-center'>
                    <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        disabled={isLoading}
                        {...field}
                      />
                    )}
                  />
                    {children}
                </div>
                
                <FormError errors={errors} name={name} />
              </div>
            ))}
            {children}
          </div>


          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>
          )}
          {recaptcha &&
          <div className='w-full flex justify-center max-xs:scale-85'>
            <ReCAPTCHA
            sitekey="6Le6TT0rAAAAAHU_N1_hMggXegZoA8gyl4FNeEEM"
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
            />
          </div>}
          
          

          <Button
            type="submit"
            className="bg-dubraSecondary hover:bg-dubraSecondary/80 font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : title}
          </Button>
        </form>
      </CardContent>

      {footer && <CardFooter className="flex flex-col items-center gap-4 border-t pt-6">{footer}</CardFooter>}
    </Card>
  );
}