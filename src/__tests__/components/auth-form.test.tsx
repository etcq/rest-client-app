import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from '@/components/auth-form/auth-form';
import { loginWithCredentials } from '@/actions/sign-in';
import { redirect } from '@/i18n/navigation';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => vi.fn((key) => key)),
  useLocale: () => 'en',
}));

vi.mock('@/actions/sign-in', () => ({
  loginWithCredentials: vi.fn(),
}));

vi.mock('@/actions/register', () => ({
  registerUser: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('next-auth/react', () => ({
  getSession: vi.fn().mockResolvedValue({
    user: { email: 'test@gmail.com' },
    expires: new Date().toISOString(),
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AuthForm', () => {
  describe('Login Form', () => {
    it('should show validation errors for invalid input', async () => {
      render(<AuthForm type="login" />);
      const emailInput = screen.getByLabelText('Auth.email');
      const passwordInput = screen.getByLabelText('Auth.password');
      const submitButton = screen.getByRole('button', { name: 'Navigation.login' });
      expect(submitButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'abcd' } });

      fireEvent.click(submitButton);

      expect(await screen.findByText('emailInvalid')).toBeInTheDocument();
      expect(await screen.findByText('passwordLength')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('should submit the form with valid data and redirect', async () => {
      render(<AuthForm type="login" />);
      const emailInput = screen.getByLabelText('Auth.email');
      const passwordInput = screen.getByLabelText('Auth.password');
      const submitButton = screen.getByRole('button', { name: 'Navigation.login' });
      expect(submitButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123$' } });

      await waitFor(() => expect(submitButton).not.toBeDisabled());

      fireEvent.click(submitButton);

      const mockedLoginWithCredentials = vi.mocked(loginWithCredentials);
      const mockedRedirect = vi.mocked(redirect);
      await waitFor(() => {
        expect(mockedLoginWithCredentials).toHaveBeenCalledWith('test@gmail.com', 'Password123$');
        expect(mockedRedirect).toHaveBeenCalled();
      });
    });
  });

  describe('Registration Form', () => {
    it('should show validation errors for invalid input', async () => {
      render(<AuthForm type="register" />);
      const nameInput = screen.getByLabelText('Auth.name');
      const submitButton = screen.getByRole('button', { name: 'Navigation.registration' });

      expect(submitButton).toBeDisabled();

      fireEvent.change(nameInput, { target: { value: 'abcd' } });

      fireEvent.click(submitButton);

      expect(await screen.findByText('nameUppercase')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('should submit the form with valid data and redirect', async () => {
      render(<AuthForm type="register" />);
      const nameInput = screen.getByLabelText('Auth.name');
      const emailInput = screen.getByLabelText('Auth.email');
      const passwordInput = screen.getByLabelText('Auth.password');
      const submitButton = screen.getByRole('button', { name: 'Navigation.registration' });
      expect(submitButton).toBeDisabled();

      fireEvent.change(nameInput, { target: { value: 'Test' } });
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123$' } });

      await waitFor(() => expect(submitButton).not.toBeDisabled());

      fireEvent.click(submitButton);

      const mockedLoginWithCredentials = vi.mocked(loginWithCredentials);
      const mockedRedirect = vi.mocked(redirect);

      await waitFor(() => expect(mockedLoginWithCredentials).toHaveBeenCalledWith('test@gmail.com', 'Password123$'));
      expect(mockedRedirect).toHaveBeenCalled();
    });
  });
});
