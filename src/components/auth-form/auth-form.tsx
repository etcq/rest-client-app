'use client';

import { type FC } from 'react';
import { type FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { type SignInInput, type SignUpInput, signInSchema, signUpSchema } from '@/schema/auth-schema';
import { loginWithCredentials } from '@/actions/sign-in';
import { registerUser } from '@/actions/register';
import { useLocale, useTranslations } from 'next-intl';
import { getSession } from 'next-auth/react';
import { useAuthStore } from '@/store/auth-store';
import { redirect } from '@/i18n/navigation';

interface IProps {
  type: 'login' | 'register';
}

type TFormValues = SignInInput | SignUpInput;

const AuthForm: FC<IProps> = ({ type }) => {
  const t = useTranslations();
  const tError = useTranslations('AuthValidation');
  const isLogin = type === 'login';
  const schema = isLogin ? signInSchema : signUpSchema;
  const { setAuthState } = useAuthStore();
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const nameError = (errors as FieldErrors<SignUpInput>).name?.message;

  const onSubmit = async (formData: TFormValues) => {
    const { email, password } = formData as SignInInput;
    if (!isLogin) {
      await registerUser(formData as SignUpInput);
    }
    await loginWithCredentials(email, password);
    const session = await getSession();
    if (session) {
      setAuthState('authenticated', session);
      redirect({ href: '/', locale: locale });
    }
  };

  return (
    <Box component="form" sx={{ width: 400, mx: 'auto', mt: 8 }} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" mb={2}>
        {isLogin ? t('Navigation.login') : t('Navigation.registration')}
      </Typography>

      {!isLogin && (
        <TextField
          label={t('Auth.name')}
          fullWidth
          margin="normal"
          {...register('name')}
          helperText={nameError && tError(nameError)}
          error={!!nameError}
        />
      )}

      <TextField
        label={t('Auth.email')}
        fullWidth
        margin="normal"
        {...register('email')}
        helperText={errors.email?.message && tError(errors.email.message)}
        error={!!errors.email}
      />

      <TextField
        label={t('Auth.password')}
        type="password"
        fullWidth
        margin="normal"
        {...register('password')}
        helperText={errors.password?.message && tError(errors.password.message)}
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
