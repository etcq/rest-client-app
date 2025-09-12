'use client';

import type { FC } from 'react';
import { type FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { type SignInInput, type SignUpInput, signInSchema, signUpSchema } from '@/schema/auth-schema';
import { loginWithCredentials } from '@/actions/sign-in';
import { registerUser } from '@/actions/register';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface IProps {
  type: 'login' | 'register';
}

type TFormValues = SignInInput | SignUpInput;

const AuthForm: FC<IProps> = ({ type }) => {
  const t = useTranslations();
  const isLogin = type === 'login';
  const schema = isLogin ? signInSchema : signUpSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (formData: TFormValues) => {
    if (isLogin) {
      const { email, password } = formData as SignInInput;
      await loginWithCredentials(email, password);
    } else {
      await registerUser(formData as SignUpInput);
      const { email, password } = formData as SignUpInput;
      await loginWithCredentials(email, password);
    }
    redirect('/');
  };

  return (
    <Box component="form" sx={{ width: 400, mx: 'auto', mt: 8 }} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" mb={2}>
        {isLogin ? t('Navigation.login') : t('Navigation.registration')}
      </Typography>

      {!isLogin && (
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register('name')}
          helperText={(errors as FieldErrors<SignUpInput>).name?.message}
          error={!!(errors as FieldErrors<SignUpInput>).name}
        />
      )}

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email')}
        helperText={errors.email?.message}
        error={!!errors.email}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('password')}
        helperText={errors.password?.message}
        error={!!errors.password}
      />

      <Box mt={2} display="flex" justifyContent="center">
        <Button type="submit" variant="contained" disabled={!isValid} fullWidth>
          {isLogin ? t('Navigation.login') : t('Navigation.registration')}
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Link href={isLogin ? '/registration' : '/login'} variant="body1" sx={{ display: 'block', mt: 2 }}>
          {isLogin
            ? `${t('Auth.noAccount')}${t('Navigation.registration')}`
            : `${t('Auth.haveAccount')}${t('Navigation.login')}`}
        </Link>
      </Box>
    </Box>
  );
};

export default AuthForm;
