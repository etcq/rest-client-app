import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegistrationForm from '@/app/[locale]/registration/page';

vi.mock('@/components/auth-form/auth-form', () => ({
  default: vi.fn(({ type }) => <div data-testid="auth-form">AuthForm with type: {type}</div>),
}));

describe('RegistrationForm', () => {
  it('should render the AuthForm component with type="login"', () => {
    render(<RegistrationForm />);

    const authFormElement = screen.getByTestId('auth-form');
    expect(authFormElement).toBeInTheDocument();
    expect(authFormElement).toHaveTextContent('AuthForm with type: register');
  });
});
